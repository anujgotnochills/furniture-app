import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { User, Settings, ShoppingBag, Heart, CircleHelp as HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

const menuItems = [
  { id: 'orders', title: 'My Orders', icon: ShoppingBag, action: () => {} },
  { id: 'settings', title: 'Settings', icon: Settings, action: () => {} },
  { id: 'help', title: 'Help & Support', icon: HelpCircle, action: () => {} },
];

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const { getTotalItems } = useCart();
  const { items: wishlistItems } = useWishlist();

  if (!user) {
    return (
      <LinearGradient colors={['#F5E6D3', '#E8D5C4']} style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>
        <View style={styles.emptyContainer}>
          <User size={64} color="#8B7355" strokeWidth={1} />
          <Text style={styles.emptyTitle}>Welcome to StyleHub</Text>
          <Text style={styles.emptySubtitle}>Sign in to access your profile and orders</Text>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => router.push('/auth')}
          >
            <Text style={styles.emptyButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <LinearGradient colors={['#F5E6D3', '#E8D5C4']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>

        {/* User Info */}
        <BlurView intensity={40} style={styles.userCard}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <User size={32} color="#2D1B16" strokeWidth={2} />
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user.email}</Text>
              <Text style={styles.userEmail}>Member since 2024</Text>
            </View>
          </View>
        </BlurView>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <BlurView intensity={40} style={styles.statCard}>
            <Text style={styles.statNumber}>{getTotalItems()}</Text>
            <Text style={styles.statLabel}>Cart Items</Text>
          </BlurView>
          <BlurView intensity={40} style={styles.statCard}>
            <Text style={styles.statNumber}>{wishlistItems.length}</Text>
            <Text style={styles.statLabel}>Wishlist</Text>
          </BlurView>
          <BlurView intensity={40} style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </BlurView>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.action}
            >
              <BlurView intensity={40} style={styles.menuItemInner}>
                <View style={styles.menuItemLeft}>
                  <View style={styles.menuIcon}>
                    <item.icon size={20} color="#2D1B16" strokeWidth={2} />
                  </View>
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </View>
                <ChevronRight size={16} color="#8B7355" strokeWidth={2} />
              </BlurView>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sign Out */}
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <BlurView intensity={40} style={styles.signOutInner}>
            <View style={styles.signOutLeft}>
              <View style={styles.signOutIcon}>
                <LogOut size={20} color="#FF6B47" strokeWidth={2} />
              </View>
              <Text style={styles.signOutText}>Sign Out</Text>
            </View>
          </BlurView>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2D1B16',
  },
  userCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D1B16',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#8B7355',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 30,
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D1B16',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#8B7355',
  },
  menuContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  menuItem: {
    marginBottom: 12,
  },
  menuItemInner: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2D1B16',
  },
  signOutButton: {
    paddingHorizontal: 20,
  },
  signOutInner: {
    backgroundColor: 'rgba(255, 107, 71, 0.1)',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 71, 0.2)',
  },
  signOutLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signOutIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 107, 71, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FF6B47',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2D1B16',
    marginBottom: 8,
    marginTop: 20,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#8B7355',
    marginBottom: 32,
    textAlign: 'center',
  },
  emptyButton: {
    backgroundColor: '#2D1B16',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});