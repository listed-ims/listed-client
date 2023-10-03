import { AlertFilled, Button, NoAccess } from '@listed-components/atoms'
import { router } from 'expo-router';
import { Modal, Row, Text, Column, useTheme } from 'native-base'
import { InterfaceModalProps } from 'native-base/lib/typescript/components/composites/Modal/types';
import React, { useState } from 'react';
import { BlurView } from 'expo-blur';

export const renderUnauthorizedModal = (isUnauthorized: boolean) => {
  if (isUnauthorized) {
    return <UnauthorizedModal />
  }
}

const UnauthorizedModal = ({ onClose, isOpen = true, ...props }: InterfaceModalProps) => {
  const [showModal, setShowModal] = useState(isOpen)
  const { colors } = useTheme();

  const handleClose = () => {
    setShowModal(false)
    if (router.canGoBack()) {
      router.back();
    }
  }

  return (
    <BlurView
      style={{
        height: "100%",
      }}>
      <Modal {...props} paddingX="4" backdropVisible={true}
        onClose={handleClose}
        closeOnOverlayClick
        height="full"
        isOpen={showModal}>
        <Modal.Content width="full" minHeight="1/2">
          <Modal.Header alignItems="center">
            <Column alignItems="center" space="2" paddingY="2">
              <AlertFilled color={colors.error[500]} />
              <Text fontWeight="bold" fontSize="lg">Unauthorized Access</Text>
            </Column>
          </Modal.Header>
          <Modal.Body>
            <Column alignItems="center" space="4" paddingY="2">
              <Text fontSize="md" textAlign="center">
                You do not have the necessary permission to access this page.
              </Text>
              <NoAccess />
              <Text fontSize="md" fontWeight="medium" textAlign="center">
                Please contact your store owner to request access.
              </Text>
            </Column>
          </Modal.Body>
          <Modal.Footer>
            <Row
              width="full"
              justifyContent="center"
              paddingY="2"
            >
              <Button
                flex="1"
                variant="warnSubtle" onPress={handleClose}>
                OK
              </Button>
            </Row>
          </Modal.Footer>
        </Modal.Content>
      </Modal >
    </BlurView>
  )
}