import { Button } from '@listed-components/atoms'
import { ModalContent } from '@listed-types';
import { Text, Modal, Row } from 'native-base'
import { InterfaceModalProps } from 'native-base/lib/typescript/components/composites/Modal/types';

interface InvalidLoginModalProps extends InterfaceModalProps {
  modalContent: ModalContent
  onClose: () => void;
}

const InvalidLoginModal: React.FC<InvalidLoginModalProps> = ({ modalContent, onClose, ...props }) => {
    
  return (
    <Modal {...props} paddingX="4" onClose={onClose}>
      <Modal.Content width="full">
          <Modal.Header alignItems="center">
            {modalContent.header}
          </Modal.Header>
          <Modal.Body>
            <Text textAlign="center">
              {modalContent.body}
            </Text>
          </Modal.Body>
          <Modal.Footer>
          <Row 
          width="full"
          justifyContent="center">
            <Button
            flex="1"
            variant="subtle" onPress={onClose}>
              OK
            </Button>
          </Row>
          </Modal.Footer>
        </Modal.Content>
    </Modal>
  )
}

export default InvalidLoginModal