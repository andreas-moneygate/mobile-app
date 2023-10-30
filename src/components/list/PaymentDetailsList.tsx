import { FileCard } from 'components/card/FileCard'
import { PaymentDetailsInput } from 'components/input/PaymentDetailsInput'
import { TextInputProps } from 'components/input/TextInput'
import { Row } from 'components/layout/Row'
import useSortedStyleProps from 'hooks/useSortedStyleProps'
import React, { memo } from 'react'
import { ScrollView } from 'react-native'
import { screenWidth } from 'utils/ui'

type PaymentDetailsListProps = {
  onUpload: (img: any) => void | any
  onDelete: (index: number) => void
  data: any
  withFiles?: boolean
}

export const PaymentDetailsList = memo(
  ({ onUpload, onDelete, data, withFiles, ...props }: PaymentDetailsListProps & TextInputProps) => {
    const { ...rest } = useSortedStyleProps(props)
    return (
      <PaymentDetailsInput onUpload={withFiles && onUpload} {...rest}>
        {withFiles ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEnabled={data.length > 1}
          >
            <Row pl="l">
              {data.map((img: any, index: number) => (
                <FileCard
                  name={img?.name}
                  size={img?.size}
                  key={index}
                  onDelete={() => onDelete(index)}
                  width={data.length === 1 ? screenWidth - 40 : screenWidth / 2}
                  ml={index !== 0 ? 's' : undefined}
                  mt="m"
                />
              ))}
            </Row>
          </ScrollView>
        ) : null}
      </PaymentDetailsInput>
    )
  },
)
