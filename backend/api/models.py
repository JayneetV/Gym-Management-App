from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

class GymOwner(AbstractUser):
    gym_name = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=15)
    address = models.TextField()

    def __str__(self):
        return self.username

class Customer(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="customers")
    name = models.CharField(max_length=200)
    age = models.IntegerField()
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=15)
    profile_picture = models.ImageField(upload_to="profile_pictures/", blank=True, null=True)
    fees = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateField(null=True, blank=True)
    expiry_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Subscription(models.Model):
    PLAN_CHOICES = [
        ('monthly', 'Monthly'),
        ('quarterly', 'Quarterly'),
        ('yearly', 'Yearly'),
    ]
    
    owner = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="subscription")
    plan_type = models.CharField(max_length=20, choices=PLAN_CHOICES)
    start_date = models.DateField(auto_now_add=True)
    end_date = models.DateField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.owner.username} - {self.plan_type}"
