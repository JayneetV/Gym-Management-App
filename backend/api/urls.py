from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomerViewSet, RegisterGymOwnerView, DashboardStatsView, SelectPlanView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'customers', CustomerViewSet, basename='customer')

urlpatterns = [
    path("user/register/", RegisterGymOwnerView.as_view(), name="register"),
    path("token/", TokenObtainPairView.as_view(), name="get_token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("dashboard-stats/", DashboardStatsView.as_view(), name="dashboard-stats"),
    path("select-plan/", SelectPlanView.as_view(), name="select-plan"),
    path('', include(router.urls)),
]
