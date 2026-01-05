from rest_framework import viewsets, permissions, generics, filters, status
from rest_framework.pagination import PageNumberPagination
from .models import Customer, GymOwner, Subscription
from .serializers import UserSerializer, CustomerSerializer
from django.db.models import Sum
from django.utils import timezone
from datetime import timedelta
from rest_framework.views import APIView
from rest_framework.response import Response

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 100

class IsSubscribed(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        if request.user.is_superuser: # Admins can access everything
            return True
        try:
            sub = request.user.subscription
            return sub.is_active and sub.end_date >= timezone.now().date()
        except Exception:
            return False

class SelectPlanView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        plan_type = request.data.get('plan_type')
        if plan_type not in ['monthly', 'quarterly', 'yearly']:
            return Response({"error": "Invalid plan type"}, status=status.HTTP_400_BAD_REQUEST)
        
        duration_map = {
            'monthly': 30,
            'quarterly': 90,
            'yearly': 365
        }
        
        start_date = timezone.now().date()
        end_date = start_date + timedelta(days=duration_map[plan_type])
        
        Subscription.objects.update_or_create(
            owner=request.user,
            defaults={
                'plan_type': plan_type,
                'start_date': start_date,
                'end_date': end_date,
                'is_active': True
            }
        )
        return Response({"message": f"Subscribed to {plan_type} plan successfully"}, status=status.HTTP_200_OK)

class RegisterGymOwnerView(generics.CreateAPIView):
    queryset = GymOwner.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class CustomerViewSet(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer
    permission_classes = [permissions.IsAuthenticated, IsSubscribed]
    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'email', 'phone']

    def get_queryset(self):
        return Customer.objects.filter(owner=self.request.user).order_by('-created_at') # ensuring that newly added customers appear on the first page.

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class DashboardStatsView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsSubscribed]

    def get(self, request):
        user = request.user
        customers = Customer.objects.filter(owner=user)

        total_members = customers.count()
        total_revenue = customers.aggregate(Sum('fees'))['fees__sum'] or 0
        
        today = timezone.now().date()
        # Active members are those whose expiry date is today or in the future
        active_members = customers.filter(expiry_date__gte=today).count()
        
        # Expiring in the next 3 days
        expiry_threshold = today + timedelta(days=3)
        expiring_soon = customers.filter(expiry_date__gte=today, expiry_date__lte=expiry_threshold).count()

        return Response({
            "total_members": total_members,
            "total_revenue": total_revenue,
            "active_members": active_members,
            "expiring_soon": expiring_soon
        })
