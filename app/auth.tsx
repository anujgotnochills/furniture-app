import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react-native';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthScreen() {
  const { signIn, signUp, resetPassword, loading } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    if (isSignUp && password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setAuthLoading(true);
    
    try {
      const { error } = isSignUp 
        ? await signUp(email, password)
        : await signIn(email, password);

      if (error) {
        let errorMessage = error.message;
        
        // Handle common Supabase errors
        if (error.message?.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password. Please try again.';
        } else if (error.message?.includes('User already registered')) {
          errorMessage = 'An account with this email already exists. Please sign in instead.';
        } else if (error.message?.includes('Email not confirmed')) {
          errorMessage = 'Please check your email and confirm your account before signing in.';
        } else if (error.message?.includes('Too many requests')) {
          errorMessage = 'Too many attempts. Please wait a moment and try again.';
        } else if (error.message?.includes('signup is disabled')) {
          errorMessage = 'Account creation is currently disabled. Please contact support.';
        }
        
        Alert.alert('Authentication Error', errorMessage);
      } else {
        if (isSignUp) {
          Alert.alert(
            'Account Created!', 
            'Welcome to StyleHub! You can now start shopping.',
            [{ text: 'OK', onPress: () => router.replace('/(tabs)') }]
          );
        } else {
          router.replace('/(tabs)');
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setAuthLoading(true);
    try {
      const { error } = await resetPassword(email);
      
      if (error) {
        let errorMessage = error.message;
        if (error.message?.includes('Too many requests')) {
          errorMessage = 'Too many reset attempts. Please wait a moment and try again.';
        }
        Alert.alert('Error', errorMessage);
      } else {
        Alert.alert(
          'Reset Email Sent',
          'Please check your email for password reset instructions.',
          [{ text: 'OK', onPress: () => setIsResetPassword(false) }]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const switchMode = (mode: 'signin' | 'signup' | 'reset') => {
    resetForm();
    setIsSignUp(mode === 'signup');
    setIsResetPassword(mode === 'reset');
  };

  return (
    <LinearGradient colors={['#F5E6D3', '#E8D5C4']} style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <ArrowLeft size={20} color="#2D1B16" strokeWidth={2} />
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <BlurView intensity={60} style={styles.formCard}>
              <Text style={styles.title}>
                {isResetPassword 
                  ? 'Reset Password' 
                  : isSignUp 
                  ? 'Create Account' 
                  : 'Welcome Back'
                }
              </Text>
              <Text style={styles.subtitle}>
                {isResetPassword
                  ? 'Enter your email to receive reset instructions'
                  : isSignUp 
                  ? 'Sign up to start shopping for amazing fashion' 
                  : 'Sign in to your StyleHub account'
                }
              </Text>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#8B7355"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  editable={!authLoading && !loading}
                />
              </View>

              {!isResetPassword && (
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={styles.passwordInput}
                      placeholder="Enter your password"
                      placeholderTextColor="#8B7355"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      autoComplete="password"
                      editable={!authLoading && !loading}
                    />
                    <TouchableOpacity
                      style={styles.eyeButton}
                      onPress={() => setShowPassword(!showPassword)}
                      disabled={authLoading || loading}
                    >
                      {showPassword ? (
                        <EyeOff size={20} color="#8B7355" strokeWidth={2} />
                      ) : (
                        <Eye size={20} color="#8B7355" strokeWidth={2} />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {isSignUp && (
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Confirm Password</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={styles.passwordInput}
                      placeholder="Confirm your password"
                      placeholderTextColor="#8B7355"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry={!showConfirmPassword}
                      autoComplete="password"
                      editable={!authLoading && !loading}
                    />
                    <TouchableOpacity
                      style={styles.eyeButton}
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={authLoading || loading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} color="#8B7355" strokeWidth={2} />
                      ) : (
                        <Eye size={20} color="#8B7355" strokeWidth={2} />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              <TouchableOpacity
                style={[styles.authButton, (authLoading || loading) && styles.authButtonDisabled]}
                onPress={isResetPassword ? handleResetPassword : handleAuth}
                disabled={authLoading || loading}
              >
                {(authLoading || loading) ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={styles.authButtonText}>
                    {isResetPassword 
                      ? 'Send Reset Email' 
                      : isSignUp 
                      ? 'Sign Up' 
                      : 'Sign In'
                    }
                  </Text>
                )}
              </TouchableOpacity>

              {!isResetPassword && (
                <>
                  <TouchableOpacity 
                    style={styles.forgotPasswordButton}
                    onPress={() => switchMode('reset')}
                    disabled={authLoading || loading}
                  >
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                  </TouchableOpacity>

                  <View style={styles.switchContainer}>
                    <Text style={styles.switchText}>
                      {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                    </Text>
                    <TouchableOpacity 
                      onPress={() => switchMode(isSignUp ? 'signin' : 'signup')}
                      disabled={authLoading || loading}
                    >
                      <Text style={styles.switchButton}>
                        {isSignUp ? 'Sign In' : 'Sign Up'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}

              {isResetPassword && (
                <View style={styles.switchContainer}>
                  <Text style={styles.switchText}>Remember your password?</Text>
                  <TouchableOpacity 
                    onPress={() => switchMode('signin')}
                    disabled={authLoading || loading}
                  >
                    <Text style={styles.switchButton}>Sign In</Text>
                  </TouchableOpacity>
                </View>
              )}
            </BlurView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  formCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 30,
    padding: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D1B16',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8B7355',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2D1B16',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#2D1B16',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#2D1B16',
  },
  eyeButton: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  authButton: {
    backgroundColor: '#2D1B16',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 24,
  },
  authButtonDisabled: {
    opacity: 0.7,
  },
  authButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPasswordButton: {
    alignItems: 'center',
    marginBottom: 16,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#8B7355',
    textDecorationLine: 'underline',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchText: {
    fontSize: 14,
    color: '#8B7355',
    marginRight: 4,
  },
  switchButton: {
    fontSize: 14,
    color: '#2D1B16',
    fontWeight: '600',
  },
});