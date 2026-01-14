import { Ionicons } from '@expo/vector-icons'
import { cssInterop } from 'nativewind'
import { Text, View, type ViewProps } from 'react-native'

cssInterop(Ionicons, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      color: true,
    },
  },
})

type Props = ViewProps & {
  count: number
  nbUsers?: number
}

const Rating = ({ count = 0, nbUsers, ...props }: Props) => {
  const rating = count / 20

  const renderStars = () => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      let iconName: 'star' | 'star-half' | 'star-outline' = 'star'
      if (i > rating) {
        if (i - rating <= 0.5) {
          iconName = 'star-half'
        } else {
          iconName = 'star-outline'
        }
      }
      stars.push(
        <Ionicons
          key={i}
          name={iconName}
          size={14}
          color="#E7C825"
          className="mx-0.5"
        />
      )
    }
    return stars
  }

  return (
    <View {...props} className="items-end">
      <View className="flex-row items-center px-2 py-1 rounded-full">
        <Text className="font-bold text-xs text-black mr-1">{rating.toFixed(1)}/5</Text>
        <View className="flex-row">{renderStars()}</View>
      </View>
      {nbUsers ? (
        <View className="flex-row">
          <Text className="text-xs text-black">Listed by </Text>
          <Text className="text-xs font-bold text-black">{nbUsers}</Text>
          <Text className="text-xs text-black"> users</Text>
        </View>
      ) : null}
    </View>
  )
}

export default Rating
