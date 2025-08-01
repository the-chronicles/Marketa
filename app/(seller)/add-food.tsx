import { db } from '@/config/firebaseConfig';
import { useUser } from '@/hooks/useUser';
import { addDoc, collection, doc, setDoc, Timestamp, } from 'firebase/firestore';
import { Camera, Minus, Plus, Save, Upload } from 'lucide-react-native';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

export default function AddFoodScreen() {
  const [foodData, setFoodData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Grains',
    preparationTime: '15',
    available: true,
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { user } = useUser();

  const categories = ['Grains', 'Swallow', 'Soup', 'Snacks', 'Drinks', 'Protein'];

  const handleSnapPhoto = () => {
    // Demo: Set a sample image
    setSelectedImage('https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg');
    // Auto-fill demo data (simulating AI recognition)
    setFoodData({
      ...foodData,
      name: 'Jollof Rice & Chicken',
      description: 'Delicious Nigerian jollof rice served with grilled chicken',
      price: '1500',
    });
  };

  const handleSaveFood = async () => {
  if (!user) {
    Toast.show({ type: 'error', text1: 'You must be logged in as seller' });
    return;
  }

  const foodEntry = {
  name: foodData.name,
  price: foodData.price,
  rating: 0,
  category: foodData.category,
  vendor: user.businessName || user.name,
  image: selectedImage || '',
  sellerId: user.id,
  createdAt: Timestamp.now(),
  isFeatured: true, // ✅ Added field
};


  try {
    // Save to /foods
    const foodRef = await addDoc(collection(db, 'foods'), foodEntry);

    // Save to /sellers/{sellerId}/menu/{foodId}
    await setDoc(doc(db, 'sellers', user.id, 'menu', foodRef.id), foodEntry);

    Toast.show({
      type: 'success',
      text1: 'Food item saved',
      text2: 'Now visible to buyers and on your dashboard!',
    });

    // Optional: clear form
    setFoodData({
      name: '',
      description: '',
      price: '',
      category: 'Grains',
      preparationTime: '15',
      available: true,
    });
    setSelectedImage(null);
  } catch (err) {
    console.error('Error saving food:', err);
    Toast.show({ type: 'error', text1: 'Save failed', text2: 'Try again later' });
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>📸 Add New Food Item</Text>
          <Text style={styles.subtitle}>Snap a photo or add manually</Text>
        </View>

        {/* Photo Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Food Photo</Text>
          <View style={styles.photoContainer}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Camera size={48} color="#6b7280" />
                <Text style={styles.photoPlaceholderText}>No photo selected</Text>
              </View>
            )}
          </View>
          <View style={styles.photoActions}>
            <TouchableOpacity style={styles.snapButton} onPress={handleSnapPhoto}>
              <Camera size={20} color="#fff" />
              <Text style={styles.snapButtonText}>📸 Snap & Auto-Fill</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.uploadButton}>
              <Upload size={20} color="#10b981" />
              <Text style={styles.uploadButtonText}>Upload</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Food Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Food Details</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Food Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Jollof Rice & Chicken"
              value={foodData.name}
              onChangeText={(text) => setFoodData({ ...foodData, name: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe your delicious food..."
              value={foodData.description}
              onChangeText={(text) => setFoodData({ ...foodData, description: text })}
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Price (₦) *</Text>
            <TextInput
              style={styles.input}
              placeholder="1500"
              value={foodData.price}
              onChangeText={(text) => setFoodData({ ...foodData, price: text })}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Category *</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryChip,
                    foodData.category === category && styles.selectedCategory
                  ]}
                  onPress={() => setFoodData({ ...foodData, category })}
                >
                  <Text style={[
                    styles.categoryText,
                    foodData.category === category && styles.selectedCategoryText
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Preparation Time (minutes)</Text>
            <View style={styles.timeContainer}>
              <TouchableOpacity
                style={styles.timeButton}
                onPress={() => setFoodData({ 
                  ...foodData, 
                  preparationTime: String(Math.max(5, parseInt(foodData.preparationTime) - 5))
                })}
              >
                <Minus size={20} color="#10b981" />
              </TouchableOpacity>
              <Text style={styles.timeText}>{foodData.preparationTime} mins</Text>
              <TouchableOpacity
                style={styles.timeButton}
                onPress={() => setFoodData({ 
                  ...foodData, 
                  preparationTime: String(parseInt(foodData.preparationTime) + 5)
                })}
              >
                <Plus size={20} color="#10b981" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Availability */}
        <View style={styles.section}>
          <View style={styles.availabilityContainer}>
            <View>
              <Text style={styles.availabilityTitle}>Available Now</Text>
              <Text style={styles.availabilitySubtitle}>Customers can order this item</Text>
            </View>
            <TouchableOpacity
              style={[styles.toggleButton, foodData.available && styles.toggleActive]}
              onPress={() => setFoodData({ ...foodData, available: !foodData.available })}
            >
              <Text style={[styles.toggleText, foodData.available && styles.toggleActiveText]}>
                {foodData.available ? 'ON' : 'OFF'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Save Button */}
        <View style={styles.saveContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveFood}>
            <Save size={20} color="#fff" />
            <Text style={styles.saveButtonText}>Save Food Item</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 20,
    backgroundColor: '#f9fafb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  selectedImage: {
    width: 200,
    height: 150,
    borderRadius: 12,
  },
  photoPlaceholder: {
    width: 200,
    height: 150,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoPlaceholderText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
  },
  photoActions: {
    flexDirection: 'row',
    gap: 12,
  },
  snapButton: {
    flex: 1,
    backgroundColor: '#10b981',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  snapButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  uploadButton: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#10b981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButtonText: {
    color: '#10b981',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    flexDirection: 'row',
  },
  categoryChip: {
    backgroundColor: '#f9fafb',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedCategory: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  categoryText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#ffffff',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  timeButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#10b981',
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginHorizontal: 20,
  },
  availabilityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
  },
  availabilityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  availabilitySubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  toggleButton: {
    backgroundColor: '#e5e7eb',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  toggleActive: {
    backgroundColor: '#10b981',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6b7280',
  },
  toggleActiveText: {
    color: '#ffffff',
  },
  saveContainer: {
    padding: 20,
  },
  saveButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
});