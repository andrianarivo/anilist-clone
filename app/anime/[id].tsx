import Button from '@components/button'
import ZoomableImage from '@components/zoomable-image'
import { Ionicons } from '@expo/vector-icons'
import AnimeDetailsSkeleton from 'features/anime/anime-details-skeleton'
import { default as Character } from 'features/anime/character'
import Rating from 'features/anime/rating'
import { LinearGradient } from 'expo-linear-gradient'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useAnimeDetails } from 'hooks/anime/use-anime-details'
import { useColorScheme } from 'nativewind'
import { useState } from 'react'
import {
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  type ViewProps,
} from 'react-native'
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler'
import HTML from 'react-native-render-html'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import type { AnimeDetailsDataFragment } from 'types/gql/graphql'

type AnimeDetailsProps = ViewProps

const AnimeDetails = ({ ...props }: AnimeDetailsProps) => {
  const { colorScheme } = useColorScheme()
  const router = useRouter()
  const { id, imgSource } = useLocalSearchParams<{
    id: string
    imgSource: string
  }>()
  const mediaId = id ? Number(id) : undefined
  const animeDetails = useAnimeDetails(mediaId as number)
  const { width, height } = useWindowDimensions()
  const insets = useSafeAreaInsets()
  const [modalVisible, setModalVisible] = useState(false)

  if (animeDetails.error) {
    return (
      <SafeAreaView className="flex-1 bg-global-bg">
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              tintColor={'white'}
              onRefresh={() => animeDetails.refetch()}
              refreshing={animeDetails.loading}
            />
          }
        >
          <View className="flex-1 justify-center items-center">
            <Text className="text-global-text">Error fetching data</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }

  if (animeDetails.data?.Media) {
    const media = animeDetails.data.Media as AnimeDetailsDataFragment
    const characters = (media.characters?.nodes ?? [])
      .filter((node): node is NonNullable<typeof node> => !!node)
      .map((node) => ({
        id: String(node.id),
        name: node.name?.userPreferred ?? 'Unknown',
        gender: node.gender ?? 'Unknown',
        imageUri: node.image?.medium ?? '',
      }))

    const animeDetailsData = {
      studio: media.studios?.nodes?.[0]?.name ?? 'Unknown',
      title: media.title?.userPreferred ?? 'Unknown',
      description: media.description ?? '',
      year: media.startDate?.year ?? 0,
      characters,
      popularity: media.popularity,
      coverImage: media.coverImage?.extraLarge,
    }

    return (
      <View {...props} className="flex-1 bg-global-bg">
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <GestureHandlerRootView style={{ flex: 1 }}>
            <View className="flex-1 bg-black justify-center items-center relative">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="absolute top-12 right-4 z-10 p-2 bg-black/50 rounded-full"
              >
                <Ionicons name="close" size={30} color="white" />
              </TouchableOpacity>
              <ZoomableImage
                uri={animeDetailsData.coverImage ?? imgSource}
                style={{ width: width, height: height }}
                contentFit="contain"
              />
            </View>
          </GestureHandlerRootView>
        </Modal>
        <FlatList
          ListHeaderComponent={() => {
            return (
              <View>
                <View className="relative">
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(true)
                    }}
                    activeOpacity={0.9}
                  >
                    <Image
                      className="w-full h-[374]"
                      resizeMode="cover"
                      source={{
                        uri: imgSource,
                      }}
                    />
                    <View className="absolute top-1/2 left-1/2 -translate-x-4 -translate-y-4 bg-black/30 rounded-full p-2">
                      <Ionicons name="expand-outline" size={24} color="white" />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => router.back()}
                    className="absolute left-4 z-10 bg-black/40 rounded-full p-2"
                    style={{ top: insets.top + 8 }}
                  >
                    <Ionicons name="chevron-back" size={24} color="white" />
                  </TouchableOpacity>
                  <LinearGradient
                    className="w-full h-20 absolute bottom-0 left-0"
                    colors={[
                      'transparent',
                      colorScheme === 'dark' ? '#152232' : '#edf1f5',
                    ]}
                  />
                </View>
                <View className="flex-row justify-between items-center mx-3">
                  <View className="flex-row items-center">
                    <View>
                      <Text className="text-global-text text-2xl font-bold max-w-[98%] mr-1">
                        {animeDetailsData.title}
                      </Text>
                      <View className="flex-row items-center">
                        <Text className="text-secondary-text text-sm">
                          {animeDetailsData.studio}
                        </Text>
                        <Text className="text-secondary-text text-xs">
                          {' '}
                          •{' '}
                        </Text>
                        <Text className="text-secondary-text text-xs">
                          {animeDetailsData.year}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Rating count={media.averageScore ?? 0} nbUsers={animeDetailsData.popularity ?? undefined} />
                </View>
                <View className="m-5">
                  <HTML
                    tagsStyles={{
                      p: {
                        fontFamily: 'Roboto_400Regular',
                        color: colorScheme === 'dark' ? '#acd5f2' : '#564e4a',
                      },
                    }}
                    contentWidth={width}
                    source={{ html: animeDetailsData.description }}
                  />
                </View>
              </View>
            )
          }}
          ItemSeparatorComponent={() => {
            return <View className="h-2" />
          }}
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: insets.bottom + 20,
          }}
          numColumns={2}
          data={animeDetailsData.characters}
          renderItem={({ item }) => {
            return (
              <Character
                key={item.id}
                id={item.id}
                name={item.name}
                gender={item.gender}
                imageUri={item.imageUri}
              />
            )
          }}
          ListFooterComponent={() => {
            return (
              <View className="h-[110] justify-center items-center">
                <Button
                  variant="primary"
                  onPress={() => {
                    console.log('touch')
                  }}
                  className="rounded-full px-8"
                  icon={<Ionicons name="play" size={16} color="white" />}
                >
                  Watch trailer
                </Button>
              </View>
            )
          }}
        />
      </View>
    )
  }

  return <AnimeDetailsSkeleton />
}

export default AnimeDetails
