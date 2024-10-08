import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import {React, useState} from 'react'

import {icons} from '../constants'
import { usePathname, router } from 'expo-router'

const SearchInput = ({title, initialQuery, placeholder, handleChangeText, otherStyles, ...props}) => {
  const pathName = usePathname()
  const [query, setQuery] = useState(initialQuery || "")
  const search = () => {
    if (!query) {
      return Alert.alert("Missing Query", "Please input something to search results across database")
    }
    if (pathName.startsWith('/search')) router.setParams({query})
      else router.push(`/search/${query}`)
  }

  return (
      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
        <TextInput className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={query}
        placeholder={placeholder}
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
        returnKeyType='search'
        onSubmitEditing={search}
        />
        <TouchableOpacity
        onPress={search}
        >
            <Image
            source={icons.search}
            className="w-5 h-5"
            resizeMode='contain'
            />
        </TouchableOpacity>
      </View>
  )
}

export default SearchInput