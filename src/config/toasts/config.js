import { View } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

export const toastConfig = {
    success: ({ text1, text2 }) => (
        <View style={{
            flexDirection: 'row',
            padding: 20,
            marginHorizontal: 10,
            top: 0,
            height: 80,
            width: '90%',
            backgroundColor: 'white',
            borderLeftWidth: 5,
            borderLeftColor: 'green',
            borderRadius: 5
        }}>
            <View style={{ flex: 0, justifyContent: "center", alignItems: "center", marginRight: 5 }}>
                <AntDesign name="checkcircleo" size={30} color="green" />
                <Text>Success!</Text>
            </View>
            <Divider style={{ width: 1, height: '100%', marginHorizontal: 7 }} />
            <View style={{ flex: 1, marginLeft: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <MaterialCommunityIcons style={{ marginRight: 5 }} name="robot-happy" size={24} color="green" />
                    <Text variant="titleLarge">{text1}</Text>
                </View>
                <Text numberOfLines={1} ellipsizeMode='tail'>{text2}</Text>
            </View>
        </View>
    ),
    error: ({ text1, text2 }) => (
        <View style={{
            flexDirection: 'row',
            padding: 20,
            marginHorizontal: 10,
            top: 0,
            height: 80,
            width: '90%',
            backgroundColor: 'white',
            borderLeftWidth: 5,
            borderLeftColor: 'tomato',
            borderRadius: 5
        }}>
            <View style={{ flex: 0, justifyContent: "center", alignItems: "center", marginRight: 5 }}>
                <Entypo name="circle-with-cross" size={30} color="tomato" />
                <Text>Error!</Text>
            </View>
            <Divider style={{ width: 1, height: '100%', marginHorizontal: 7 }} />
            <View style={{ flex: 1, marginLeft: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <MaterialCommunityIcons style={{ marginRight: 5 }} name="robot-dead" size={24} color="tomato" />
                    <Text variant="titleLarge">{text1}</Text>
                </View>
                <Text numberOfLines={1} ellipsizeMode='tail'>{text2}</Text>
            </View>
        </View>
    ),
    warning: ({ text1, text2 }) => (
        <View style={{
            flexDirection: 'row',
            padding: 20,
            marginHorizontal: 10,
            top: 0,
            height: 80,
            width: '90%',
            backgroundColor: 'white',
            borderLeftWidth: 5,
            borderLeftColor: 'orange',
            borderRadius: 5
        }}>
            <View style={{ flex: 0, justifyContent: "center", alignItems: "center", marginRight: 5 }}>
                <AntDesign name="warning" size={30} color="orange" />
                <Text>Warning!</Text>
            </View>
            <Divider style={{ width: 1, height: '100%', marginHorizontal: 7 }} />
            <View style={{ flex: 1, marginLeft: 5 }}>
                <View style={{ flexDirection: 'row' }}>
                    <MaterialCommunityIcons style={{ marginRight: 5 }} name="robot-confused" size={24} color="orange" />
                    <Text variant="titleLarge">{text1}</Text>
                </View>
                <Text numberOfLines={1} ellipsizeMode='tail'>{text2}</Text>
            </View>
        </View>
    ),
    info: ({ text1, text2 }) => (
        <View style={{
            flexDirection: 'row',
            padding: 20,
            marginHorizontal: 10,
            top: 0,
            height: 80,
            width: '90%',
            backgroundColor: 'white',
            borderLeftWidth: 5,
            borderLeftColor: '#4169E1',
            borderRadius: 5
        }}>
            <View style={{ flex: 0, justifyContent: "center", alignItems: "center", marginRight: 5 }}>
                <Entypo name="info" size={30} color="#4169E1" />
                <Text>Info!</Text>
            </View>
            <Divider style={{ width: 1, height: '100%', marginHorizontal: 7 }} />
            <View style={{ flex: 1, marginLeft: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <MaterialCommunityIcons style={{ marginRight: 5 }} name="robot-happy" size={24} color="#4169E1" />
                    <Text variant="titleLarge">{text1}</Text>
                </View>
                <Text numberOfLines={1} ellipsizeMode='tail'>{text2}</Text>
            </View>
        </View>
    )
}
