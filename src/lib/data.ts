export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    city: string;
    area: string;
    address: string;
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    area: number; // in sq. ft.
    furnished: boolean;
    parking: boolean;
  };
  images: string[];
  type: 'house' | 'apartment' | 'commercial' | 'plot';
  status: 'sale' | 'rent';
  createdAt: string;
  agent: {
    id: string;
    name: string;
    phone: string;
    email: string;
    image: string;
  };
}

export const properties: Property[] = [
  {
    id: '1',
    title: 'Luxury Villa in F-7',
    description: 'Beautiful luxury villa in the heart of F-7, Islamabad. This property features a spacious living area, modern kitchen, and a beautiful garden. The house is newly built with modern architecture and high-quality finishes. It offers a perfect blend of comfort and elegance.',
    price: 75000000,
    location: {
      city: 'Islamabad',
      area: 'F-7',
      address: 'Street 7, F-7/3, Islamabad'
    },
    features: {
      bedrooms: 5,
      bathrooms: 6,
      area: 5000,
      furnished: true,
      parking: true
    },
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=3270&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=3270&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=3270&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?q=80&w=3270&auto=format&fit=crop'
    ],
    type: 'house',
    status: 'sale',
    createdAt: '2023-10-15T10:30:00Z',
    agent: {
      id: 'a1',
      name: 'Ahmed Khan',
      phone: '+92 300 1234567',
      email: 'ahmed@dwelldynamo.com',
      image: 'https://randomuser.me/api/portraits/men/1.jpg'
    }
  },
  {
    id: '2',
    title: 'Modern Apartment in Bahria Town',
    description: 'Stylish modern apartment in Bahria Town, Islamabad. This property offers an open-plan living space, modern kitchen with built-in appliances, and a balcony with scenic views. Perfect for young professionals or small families looking for a contemporary living space.',
    price: 25000000,
    location: {
      city: 'Islamabad',
      area: 'Bahria Town',
      address: 'Phase 4, Bahria Town, Islamabad'
    },
    features: {
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      furnished: false,
      parking: true
    },
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=3270&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=3270&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=3258&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=3270&auto=format&fit=crop'
    ],
    type: 'apartment',
    status: 'sale',
    createdAt: '2023-11-05T14:45:00Z',
    agent: {
      id: 'a2',
      name: 'Sara Ali',
      phone: '+92 300 9876543',
      email: 'sara@dwelldynamo.com',
      image: 'https://randomuser.me/api/portraits/women/2.jpg'
    }
  },
  {
    id: '3',
    title: 'Commercial Space in Blue Area',
    description: 'Prime commercial space available in Blue Area, the business hub of Islamabad. This property is ideal for office setup, retail outlet, or any commercial activity. It features modern infrastructure, spacious layout, and prime location with high visibility and footfall.',
    price: 120000000,
    location: {
      city: 'Islamabad',
      area: 'Blue Area',
      address: 'Jinnah Avenue, Blue Area, Islamabad'
    },
    features: {
      bedrooms: 0,
      bathrooms: 2,
      area: 3500,
      furnished: false,
      parking: true
    },
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=3269&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=3270&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1577760258779-e787a1735018?q=80&w=3270&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513883049090-d0b7439799bf?q=80&w=3270&auto=format&fit=crop'
    ],
    type: 'commercial',
    status: 'sale',
    createdAt: '2023-09-20T09:15:00Z',
    agent: {
      id: 'a3',
      name: 'Bilal Ahmad',
      phone: '+92 300 5551234',
      email: 'bilal@dwelldynamo.com',
      image: 'https://randomuser.me/api/portraits/men/3.jpg'
    }
  },
  {
    id: '4',
    title: 'Residential Plot in DHA',
    description: 'Premium residential plot in DHA Phase II, Islamabad. This is an excellent opportunity to build your dream home in one of the most secure and well-planned communities in the city. The plot is located in a prime location with all amenities nearby.',
    price: 40000000,
    location: {
      city: 'Islamabad',
      area: 'DHA Phase II',
      address: 'Street 12, DHA Phase II, Islamabad'
    },
    features: {
      bedrooms: 0,
      bathrooms: 0,
      area: 10000, // 10 marla (250 sq yards)
      furnished: false,
      parking: false
    },
    images: [
      'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?q=80&w=3270&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=3132&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?q=80&w=3270&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1543525238-54e3d131f7ca?q=80&w=3270&auto=format&fit=crop'
    ],
    type: 'plot',
    status: 'sale',
    createdAt: '2023-12-01T11:20:00Z',
    agent: {
      id: 'a1',
      name: 'Ahmed Khan',
      phone: '+92 300 1234567',
      email: 'ahmed@dwelldynamo.com',
      image: 'https://randomuser.me/api/portraits/men/1.jpg'
    }
  },
  {
    id: '5',
    title: 'Family Home for Rent in F-10',
    description: 'Spacious family home available for rent in F-10, Islamabad. This comfortable house offers a family-friendly layout, modern amenities, and a peaceful neighborhood. Ideal for families looking for a well-maintained home in a prime location of Islamabad.',
    price: 150000, // monthly rent
    location: {
      city: 'Islamabad',
      area: 'F-10',
      address: 'Street 22, F-10/2, Islamabad'
    },
    features: {
      bedrooms: 4,
      bathrooms: 3,
      area: 3200,
      furnished: true,
      parking: true
    },
    images: [
      'https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=3270&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=3270&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=3270&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=3270&auto=format&fit=crop'
    ],
    type: 'house',
    status: 'rent',
    createdAt: '2023-11-15T13:00:00Z',
    agent: {
      id: 'a2',
      name: 'Sara Ali',
      phone: '+92 300 9876543',
      email: 'sara@dwelldynamo.com',
      image: 'https://randomuser.me/api/portraits/women/2.jpg'
    }
  },
  {
    id: '6',
    title: 'Studio Apartment in E-11',
    description: 'Cozy studio apartment available for rent in E-11, Islamabad. This compact yet stylish apartment offers modern living space with all necessary amenities. Perfect for students or young professionals looking for an affordable and well-located accommodation.',
    price: 45000, // monthly rent
    location: {
      city: 'Islamabad',
      area: 'E-11',
      address: 'Sector E-11/3, Islamabad'
    },
    features: {
      bedrooms: 1,
      bathrooms: 1,
      area: 650,
      furnished: true,
      parking: true
    },
    images: [
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=3157&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=3270&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531835551805-16d864c8d311?q=80&w=3270&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?q=80&w=3270&auto=format&fit=crop'
    ],
    type: 'apartment',
    status: 'rent',
    createdAt: '2023-12-10T16:30:00Z',
    agent: {
      id: 'a3',
      name: 'Bilal Ahmad',
      phone: '+92 300 5551234',
      email: 'bilal@dwelldynamo.com',
      image: 'https://randomuser.me/api/portraits/men/3.jpg'
    }
  },
  {
    id: '7',
    title: 'Office Space for Rent in G-8',
    description: 'Professional office space available for rent in G-8, Islamabad. This well-designed space is perfect for businesses, startups, or professionals seeking a professional environment. Features include modern infrastructure, meeting room, and a reception area.',
    price: 85000, // monthly rent
    location: {
      city: 'Islamabad',
      area: 'G-8',
      address: 'Main Market, G-8 Markaz, Islamabad'
    },
    features: {
      bedrooms: 0,
      bathrooms: 1,
      area: 1200,
      furnished: true,
      parking: true
    },
    images: [
      'https://images.unsplash.com/photo-1577041462058-55044f178a0c?q=80&w=3270&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=3270&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=3432&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606836528463-92fca5dacfe7?q=80&w=3271&auto=format&fit=crop'
    ],
    type: 'commercial',
    status: 'rent',
    createdAt: '2023-10-25T10:00:00Z',
    agent: {
      id: 'a1',
      name: 'Ahmed Khan',
      phone: '+92 300 1234567',
      email: 'ahmed@dwelldynamo.com',
      image: 'https://randomuser.me/api/portraits/men/1.jpg'
    }
  },
  {
    id: '8',
    title: 'Elegant House in F-8',
    description: 'Elegant house for sale in F-8, Islamabad. This beautiful property offers luxurious living spaces, modern amenities, and a prime location. The house features high-quality finishes, a beautiful garden, and a stylish interior design.',
    price: 65000000,
    location: {
      city: 'Islamabad',
      area: 'F-8',
      address: 'Street 9, F-8/3, Islamabad'
    },
    features: {
      bedrooms: 4,
      bathrooms: 4,
      area: 4200,
      furnished: false,
      parking: true
    },
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=3270&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=3275&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=3270&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?q=80&w=3271&auto=format&fit=crop'
    ],
    type: 'house',
    status: 'sale',
    createdAt: '2023-11-28T12:15:00Z',
    agent: {
      id: 'a2',
      name: 'Sara Ali',
      phone: '+92 300 9876543',
      email: 'sara@dwelldynamo.com',
      image: 'https://randomuser.me/api/portraits/women/2.jpg'
    }
  }
];

export const getPropertyById = (id: string): Property | undefined => {
  return properties.find(property => property.id === id);
};

export const getPropertiesByType = (type?: string, status?: string, minPrice?: number, maxPrice?: number) => {
  let filteredProperties = [...properties];

  if (type && type !== 'all') {
    filteredProperties = filteredProperties.filter(property => property.type === type);
  }

  if (status && status !== 'all') {
    filteredProperties = filteredProperties.filter(property => property.status === status);
  }

  if (minPrice !== undefined) {
    filteredProperties = filteredProperties.filter(property => property.price >= minPrice);
  }

  if (maxPrice !== undefined) {
    filteredProperties = filteredProperties.filter(property => property.price <= maxPrice);
  }

  return filteredProperties;
};

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderImage?: string;
  receiverId: string;
  receiverName: string;
  receiverImage?: string;
  message: string;
  createdAt: string;
  read: boolean;
  propertyId?: string;
  propertyTitle?: string;
}

let messages: Message[] = [
  {
    id: 'm1',
    senderId: 'u1',
    senderName: 'John Doe',
    senderImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    receiverId: 'a1',
    receiverName: 'Ahmed Khan',
    receiverImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    message: 'I am interested in the luxury villa in F-7. Is it still available?',
    createdAt: '2023-12-18T10:30:00Z',
    read: true,
    propertyId: '1',
    propertyTitle: 'Luxury Villa in F-7'
  },
  {
    id: 'm2',
    senderId: 'a1',
    senderName: 'Ahmed Khan',
    senderImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    receiverId: 'u1',
    receiverName: 'John Doe',
    receiverImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    message: 'Yes, it is still available. Would you like to schedule a viewing?',
    createdAt: '2023-12-18T11:45:00Z',
    read: true,
    propertyId: '1',
    propertyTitle: 'Luxury Villa in F-7'
  },
  {
    id: 'm3',
    senderId: 'u2',
    senderName: 'Jane Smith',
    senderImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    receiverId: 'a2',
    receiverName: 'Sara Ali',
    receiverImage: 'https://randomuser.me/api/portraits/women/2.jpg',
    message: 'Is the apartment in Bahria Town pet-friendly?',
    createdAt: '2023-12-19T09:15:00Z',
    read: false,
    propertyId: '2',
    propertyTitle: 'Modern Apartment in Bahria Town'
  }
];

export const addProperty = async (propertyData: Omit<Property, 'id' | 'createdAt'>) => {
  try {
    const newProperty: Property = {
      id: `p${properties.length + 1}`,
      ...propertyData,
      createdAt: new Date().toISOString()
    };
    
    properties.push(newProperty);
    
    return {
      success: true,
      propertyId: newProperty.id,
      message: 'Property added successfully'
    };
  } catch (error) {
    console.error('Error adding property:', error);
    return {
      success: false,
      message: 'Failed to add property'
    };
  }
};

export const updateProperty = async (id: string, propertyData: Partial<Property>) => {
  try {
    const propertyIndex = properties.findIndex(p => p.id === id);
    
    if (propertyIndex === -1) {
      return {
        success: false,
        message: 'Property not found'
      };
    }
    
    properties[propertyIndex] = {
      ...properties[propertyIndex],
      ...propertyData
    };
    
    return {
      success: true,
      message: 'Property updated successfully'
    };
  } catch (error) {
    console.error('Error updating property:', error);
    return {
      success: false,
      message: 'Failed to update property'
    };
  }
};

export const deleteProperty = async (id: string) => {
  try {
    const propertyIndex = properties.findIndex(p => p.id === id);
    
    if (propertyIndex === -1) {
      return {
        success: false,
        message: 'Property not found'
      };
    }
    
    properties.splice(propertyIndex, 1);
    
    return {
      success: true,
      message: 'Property deleted successfully'
    };
  } catch (error) {
    console.error('Error deleting property:', error);
    return {
      success: false,
      message: 'Failed to delete property'
    };
  }
};

export const getUserProperties = async (userId: string) => {
  return properties.filter(property => property.agent.id === userId);
};

export const getMessages = async (userId: string) => {
  return messages.filter(
    message => message.senderId === userId || message.receiverId === userId
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const sendMessage = async ({
  senderId,
  receiverId,
  message,
  propertyId,
  propertyTitle
}: {
  senderId: string;
  receiverId: string;
  message: string;
  propertyId?: string;
  propertyTitle?: string;
}) => {
  try {
    const sender = users.find(u => u.id === senderId);
    const receiver = users.find(u => u.id === receiverId) || 
                    properties.find(p => p.agent.id === receiverId)?.agent;
    
    if (!sender || !receiver) {
      return {
        success: false,
        message: 'Sender or receiver not found'
      };
    }
    
    const newMessage: Message = {
      id: `m${messages.length + 1}`,
      senderId,
      senderName: sender.name,
      senderImage: sender.id.startsWith('a') 
        ? sender.image 
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(sender.name)}&background=random`,
      receiverId,
      receiverName: receiver.name,
      receiverImage: receiver.id.startsWith('a') 
        ? receiver.image 
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(receiver.name)}&background=random`,
      message,
      createdAt: new Date().toISOString(),
      read: false,
      propertyId,
      propertyTitle
    };
    
    messages.push(newMessage);
    
    return {
      success: true,
      messageId: newMessage.id,
      message: 'Message sent successfully'
    };
  } catch (error) {
    console.error('Error sending message:', error);
    return {
      success: false,
      message: 'Failed to send message'
    };
  }
};

export const markAsRead = async (userId: string, otherUserId: string) => {
  try {
    messages = messages.map(message => {
      if (message.senderId === otherUserId && message.receiverId === userId && !message.read) {
        return { ...message, read: true };
      }
      return message;
    });
    
    return {
      success: true,
      message: 'Messages marked as read'
    };
  } catch (error) {
    console.error('Error marking messages as read:', error);
    return {
      success: false,
      message: 'Failed to mark messages as read'
    };
  }
};

export const chatbotResponses = {
  buying: {
    process: "To buy a property in Islamabad, you should start by determining your budget, researching areas, visiting properties, checking legal documents, making an offer, signing the sale deed, and registering the property.",
    tips: "When buying a property in Islamabad, ensure all legal documents are verified, check the CDA/RDA status, inspect the property thoroughly, verify the CNIC of the seller, and consider hiring a property lawyer.",
    finance: "You can finance your property purchase through bank loans, mortgage facilities, or installment plans offered by developers. The current mortgage rate in Pakistan is approximately 12-14%."
  },
  renting: {
    process: "To rent a property, search for listings, schedule viewings, submit an application, sign a lease agreement, pay the security deposit, and move in.",
    tips: "When renting, check for maintenance responsibilities, understand the terms of the lease, know your rights as a tenant, negotiate the rent if possible, and document the condition of the property before moving in.",
    documents: "Documents required for renting include CNIC, proof of income, references, and sometimes employment verification."
  },
  investment: {
    advice: "Islamabad offers good investment opportunities, especially in developing sectors like Bahria Town, DHA, and the new Blue Area. Commercial properties often yield higher returns but require larger investment.",
    returns: "Property investment in Islamabad typically yields 5-8% annual rental returns, with potential capital appreciation of 10-15% annually in developing areas.",
    hotspots: "Current investment hotspots in Islamabad include Bahria Town Phase 8, DHA Phase II, and the New Blue Area project."
  },
  rates: {
    "F-Sectors": "Property rates in F sectors (F-6, F-7, F-8) range from PKR 60,000 to PKR 100,000 per square yard for residential plots.",
    "E-Sectors": "E sectors (E-7, E-11) have rates ranging from PKR 50,000 to PKR 80,000 per square yard.",
    "Bahria Town": "Bahria Town rates range from PKR 12,000 to PKR 40,000 per square yard depending on the phase and plot size.",
    "DHA": "DHA Islamabad rates range from PKR 25,000 to PKR 60,000 per square yard depending on the phase."
  }
};

export interface MaterialType {
  id: string;
  name: string;
  costPerSqFt: number;
  description: string;
}

export const materialTypes: MaterialType[] = [
  {
    id: 'standard',
    name: 'Standard Quality',
    costPerSqFt: 3500,
    description: 'Basic construction materials suitable for budget projects.'
  },
  {
    id: 'medium',
    name: 'Medium Quality',
    costPerSqFt: 5000,
    description: 'Mid-range materials with better durability and appearance.'
  },
  {
    id: 'premium',
    name: 'Premium Quality',
    costPerSqFt: 7500,
    description: 'High-end materials for luxury construction with superior finishes.'
  },
  {
    id: 'luxury',
    name: 'Luxury Quality',
    costPerSqFt: 10000,
    description: 'Exclusive materials for high-end luxury constructions with imported finishes.'
  }
];

export interface LaborRate {
  id: string;
  name: string;
  ratePerDay: number;
  description: string;
}

export const laborRates: LaborRate[] = [
  {
    id: 'basic',
    name: 'Basic Labor',
    ratePerDay: 1000,
    description: 'General labor for basic construction tasks.'
  },
  {
    id: 'skilled',
    name: 'Skilled Labor',
    ratePerDay: 1500,
    description: 'Skilled workers with experience in specific construction areas.'
  },
  {
    id: 'expert',
    name: 'Expert Labor',
    ratePerDay: 2500,
    description: 'Highly experienced professionals for specialized construction work.'
  }
];

export const calculateConstructionCost = (
  area: number,
  materialTypeId: string,
  laborRateId: string,
  durationDays: number
) => {
  const material = materialTypes.find(m => m.id === materialTypeId);
  const labor = laborRates.find(l => l.id === laborRateId);
  
  if (!material || !labor) {
    return {
      success: false,
      error: 'Invalid material type or labor rate selected.'
    };
  }
  
  const materialCost = area * material.costPerSqFt;
  const laborCost = labor.ratePerDay * durationDays;
  
  const teamSize = Math.ceil(area / 1000) + 2;
  const totalLaborCost = laborCost * teamSize;
  
  const additionalCosts = materialCost * 0.18;
  
  const totalCost = materialCost + totalLaborCost + additionalCosts;
  
  return {
    success: true,
    breakdown: {
      materialCost,
      laborCost: totalLaborCost,
      additionalCosts,
      totalCost
    }
  };
};

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  image?: string;
  favorites: string[];
  searchHistory: {
    query: string;
    timestamp: string;
  }[];
}

export const users: User[] = [
  {
    id: 'u1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    phone: '+92 300 1112233',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    favorites: ['1', '3', '5'],
    searchHistory: [
      { query: 'houses in F-7', timestamp: '2023-12-10T14:30:00Z' },
      { query: 'commercial property', timestamp: '2023-12-12T09:15:00Z' },
      { query: 'apartment for rent', timestamp: '2023-12-15T16:45:00Z' }
    ]
  },
  {
    id: 'u2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password456',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    favorites: ['2', '4', '7'],
    searchHistory: [
      { query: 'plots in DHA', timestamp: '2023-11-20T10:30:00Z' },
      { query: 'house for sale', timestamp: '2023-11-25T12:45:00Z' },
      { query: 'bahria town property', timestamp: '2023-12-05T15:20:00Z' }
    ]
  }
];

export const authenticateUser = (email: string, password: string) => {
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return {
      success: true,
      user: userWithoutPassword
    };
  }
  return {
    success: false,
    message: 'Invalid email or password'
  };
};

export const getRecommendedProperties = (userId: string) => {
  const user = users.find(u => u.id === userId);
  if (!user) {
    return [];
  }
  
  const favoriteProperties = user.favorites.map(id => getPropertyById(id)).filter(Boolean) as Property[];
  
  const favoriteTypes = new Set(favoriteProperties.map(p => p.type));
  const favoriteAreas = new Set(favoriteProperties.map(p => p.location.area));
  const favoritePriceMin = Math.min(...favoriteProperties.map(p => p.price)) * 0.8;
  const favoritePriceMax = Math.max(...favoriteProperties.map(p => p.price)) * 1.2;
  
  const recommendations = properties.filter(property => 
    !user.favorites.includes(property.id) && 
    (favoriteTypes.has(property.type) || 
     favoriteAreas.has(property.location.area) ||
     (property.price >= favoritePriceMin && property.price <= favoritePriceMax))
  );
  
  return recommendations.sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;
    
    if (favoriteTypes.has(a.type)) scoreA += 2;
    if (favoriteTypes.has(b.type)) scoreB += 2;
    
    if (favoriteAreas.has(a.location.area)) scoreA += 3;
    if (favoriteAreas.has(b.location.area)) scoreB += 3;
    
    if (a.price >= favoritePriceMin && a.price <= favoritePriceMax) scoreA += 1;
    if (b.price >= favoritePriceMin && b.price <= favoritePriceMax) scoreB += 1;
    
    return scoreB - scoreA;
  }).slice(0, 4);
};

export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};
