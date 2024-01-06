import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useState } from "react";
import { Types } from "../../types/Earthereum";

type ClaimFormValues = {
  zkInput?: string;
  zkProof?: string;
};

type ClaimFormProps = {
  show: boolean;
  onClose: () => void;
  onSave: (zkInput: Types.ProofInput, zkProof: Types.ProofStruct) => void;
  countryName: string;
  loading: boolean;
}


const ClaimForm: React.FunctionComponent<ClaimFormProps> = ({ show, onClose, onSave, countryName, loading }) => {
  const [formValues, setFormValues] = useState<ClaimFormValues>({});

  const handleSave = () => {
    if (!formValues.zkInput || !formValues.zkProof) {
      // TODO: implement proper validation
      console.log("invalid form input");
      return;
    }

    const zkInput = JSON.parse(formValues.zkInput) as Types.ProofInput;
    const proof = JSON.parse(formValues.zkProof) as Types.ProofStruct;

    onSave(zkInput, proof);
  };

  const onValueChange = (e: any) => {
    let prettyValue;

    try {
      prettyValue = JSON.stringify((JSON.parse(e.target.value)), null, 2);
    } catch(e) {
      console.log(e);
    }
    e.target.value = prettyValue || e.target.value;
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  return (

    <Modal
      show={show} onHide={onClose}
      size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Claim {countryName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="claimForm.zkInput"
              >
              <Form.Label>ZK Input</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                size="sm"
                name="zkInput"
                onChange={onValueChange}
                />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="claimForm.zkProof"
              >
              <Form.Label>ZK Proof</Form.Label>
              <Form.Control
                as="textarea"
                rows={20}
                size="sm"
                name="zkProof"
                onChange={onValueChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {loading
              ? <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              : <></>
            }
            Claim
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default ClaimForm;