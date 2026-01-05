from rest_framework import serializers
from .models import Customer, GymOwner

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = GymOwner
        fields = ["id", "username", "password", "email", "gym_name", "phone_number", "address"]

    def create(self, validated_data):
        return GymOwner.objects.create_user(**validated_data)

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'name', 'age', 'email', 'phone', 'profile_picture', 'fees', 'payment_date', 'expiry_date', 'created_at']
