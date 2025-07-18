import { auth } from '@/config/firebaseConfig';
import { useUser } from '@/hooks/useUser';
import { router } from 'expo-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthScreen() {
  const { login } = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'buyer' as 'buyer' | 'seller' | 'rider',
  });

  const roles = [
    { id: 'buyer', title: 'Student/Buyer', description: 'Order delicious food from campus', icon: '🍕' },
    { id: 'seller', title: 'Food Vendor', description: 'Sell food to hungry students', icon: '👨‍🍳' },
    { id: 'rider', title: 'Delivery Rider', description: 'Deliver food to students', icon: '🚴‍♂️' },
  ];

  const db = getFirestore();

  // const handleAuth = () => {
  //   // Demo authentication - use demo data based on role
  //   const demoUsers = {
  //     buyer: {
  //       id: '1',
  //       name: 'John Doe',
  //       email: 'john.doe@ui.edu.ng',
  //       role: 'buyer' as const,
  //       verified: true,
  //     },
  //     seller: {
  //       id: '2',
  //       name: 'Mama Simi Kitchen',
  //       email: 'mamasimi@ui.edu.ng',
  //       role: 'seller' as const,
  //       verified: true,
  //     },
  //     rider: {
  //       id: '3',
  //       name: 'Delivery Mike',
  //       email: 'mike.rider@ui.edu.ng',
  //       role: 'rider' as const,
  //       verified: true,
  //     }
  //   };

  //   const userData = demoUsers[formData.role];
  //   login(userData);
    
  //   // Navigate based on role
  //   switch (formData.role) {
  //     case 'buyer':
  //       router.replace('/(buyer)');
  //       break;
  //     case 'seller':
  //       router.replace('/(seller)');
  //       break;
  //     case 'rider':
  //       router.replace('/(rider)');
  //       break;
  //   }
  // };


//   const handleAuth = async () => {
//   try {
//     let userCredential;

//     if (isLogin) {
//       // LOGIN flow
//       userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
//     } else {
//       // SIGN UP flow
//       userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      
//       const firebaseUser = userCredential.user;

//       // 🔥 Save additional user info to Firestore
//       await setDoc(doc(db, 'users', firebaseUser.uid), {
//         name: formData.name,
//         role: formData.role,
//         email: firebaseUser.email,
//       });
//     }

//     const firebaseUser = userCredential.user;

//     login({
//       id: firebaseUser.uid,
//       name: formData.name || firebaseUser.email || 'User',
//       email: firebaseUser.email || '',
//       role: formData.role,
//       verified: firebaseUser.emailVerified,
//     });

//     // Navigate based on role
//     switch (formData.role) {
//       case 'buyer':
//         router.replace('/(buyer)');
//         break;
//       case 'seller':
//         router.replace('/(seller)');
//         break;
//       case 'rider':
//         router.replace('/(rider)');
//         break;
//     }

//   } catch (error: any) {
//     console.log('Authentication error:', error.message);
//     alert(error.message);
//   }
// };



const handleAuth = async () => {
  try {
    let userCredential;

    if (isLogin) {
      userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
    } else {
      // Sign up new user
      userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      // Save name and role to Firestore
      const userRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userRef, {
        name: formData.name,
        role: formData.role,
        email: formData.email,
      });
    }

    // Fetch name and role from Firestore (works for both login and signup)
    const userRef = doc(db, 'users', userCredential.user.uid);
    const userSnap = await getDoc(userRef);

    const userDataFromFirestore = userSnap.exists() ? userSnap.data() : {};

    // login({
    //   id: userCredential.user.uid,
    //   name: userDataFromFirestore.name || formData.name || 'User',
    //   email: userCredential.user.email || '',
    //   role: userDataFromFirestore.role || formData.role,
    //   verified: userCredential.user.emailVerified,
    // });

    login({
  id: userCredential.user.uid,
  name: userDataFromFirestore.name || 'User',
  email: userCredential.user.email || '',
  role: userDataFromFirestore.role || 'buyer',
  verified: userCredential.user.emailVerified,
});


    // Navigate based on role
    switch (userDataFromFirestore.role || formData.role) {
      case 'buyer':
        router.replace('/(buyer)');
        break;
      case 'seller':
        router.replace('/(seller)');
        break;
      case 'rider':
        router.replace('/(rider)');
        break;
    }

  } catch (error: any) {
    console.error('Authentication Error:', error.message);
    alert(error.message);
  }
};
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🍕 Omnimarketa</Text>
        <Text style={styles.subtitle}>University of Ibadan Food Delivery</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, isLogin && styles.activeTab]}
            onPress={() => setIsLogin(true)}
          >
            <Text style={[styles.tabText, isLogin && styles.activeTabText]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, !isLogin && styles.activeTab]}
            onPress={() => setIsLogin(false)}
          >
            <Text style={[styles.tabText, !isLogin && styles.activeTabText]}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {!isLogin && (
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          secureTextEntry
        />

        {!isLogin && (
          <View style={styles.roleContainer}>
            <Text style={styles.roleTitle}>I want to:</Text>
            {roles.map((role) => (
              <TouchableOpacity
                key={role.id}
                style={[
                  styles.roleCard,
                  formData.role === role.id && styles.selectedRole
                ]}
                onPress={() => setFormData({ ...formData, role: role.id as any })}
              >
                <Text style={styles.roleIcon}>{role.icon}</Text>
                <View style={styles.roleInfo}>
                  <Text style={styles.roleCardTitle}>{role.title}</Text>
                  <Text style={styles.roleDescription}>{role.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity style={styles.authButton} onPress={handleAuth}>
          <Text style={styles.authButtonText}>
            {isLogin ? 'Login' : 'Create Account'}
          </Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 30,
    backgroundColor: '#f9fafb',
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  form: {
    flex: 1,
    padding: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    marginBottom: 24,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#10b981',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#ffffff',
  },
  input: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  roleContainer: {
    marginBottom: 24,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  selectedRole: {
    borderColor: '#10b981',
    backgroundColor: '#f0fdf4',
  },
  roleIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  roleInfo: {
    flex: 1,
  },
  roleCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  authButton: {
    backgroundColor: '#10b981',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  authButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 18,
  },
});