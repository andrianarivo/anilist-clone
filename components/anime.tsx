import { ROUTES } from 'constants/routes'
import { useRouter } from 'expo-router'
import { cssInterop } from 'nativewind'
import { useEffect } from 'react'
import { Text, TouchableOpacity, View, type ViewProps } from 'react-native'
import Animated from 'react-native-reanimated'
import Rating from './rating'

cssInterop(Animated.Image, { className: 'style' })

type Props = ViewProps & {
  uri: string
  mediaId: string
  ratings: number
  description: string
  nbUsers: number
  title: string
  year: number
}

const Anime = ({
  mediaId,
  uri,
  ratings,
  title,
  year,
  nbUsers,
  description,
  ...props
}: Props) => {
  const router = useRouter()
  useEffect(() => {}, [])

  const anime = {
    mediaId: mediaId,
    imgSource: uri,
  }

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: ROUTES.DYNAMIC.ANIME_DETAILS(mediaId),
          params: { imgSource: uri },
        })
      }
    >
      <View
        {...props}
        className="m-2 rounded-2xl overflow-hidden shadow-sm bg-white/10"
      >
        <View className="w-full aspect-video relative">
          <Animated.Image
            // @ts-ignore
            sharedTransitionTag={`image_${anime.mediaId}`}
            className="w-full h-full"
            source={{ uri: uri }}
            resizeMode="cover"
          />
          <View className="absolute top-2 right-2 px-2 py-1 rounded-md bg-white/90 backdrop-blur-md">
            <Rating count={ratings} nbUsers={nbUsers} />
          </View>
        </View>
        <View className="p-3">
          <Text
            className="font-bold text-lg text-global-text mb-1"
            numberOfLines={1}
          >
            {title}
          </Text>
          <Text className="font-medium text-sm text-secondary-text">
            {year}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default Anime
