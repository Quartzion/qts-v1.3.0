import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import GeneralForm from '../GeneralForm';
import { createFollowUpRequest } from '../../utils/API';

const connectWithUsFormFields = [
  { label: "Your Name", name: "name", type: "text", required: true, placeholder: "Name", autoComplete: "on" },
  { label: "Your Organization", name: "organization", type: "text", required: true, placeholder: "nonprofit organization", autoComplete: "on" },
  { label: "Your Email", name: "email", type: "email", required: true, placeholder: "email", autoComplete: "on" },
  { label: "Your Phone Number", name: "phone", type: "tel", required: true, placeholder: "e.g. (555) 123-4567", autoComplete: "tel" },
  { label: "Your Budget", name: "budget", type: "radio", required: true, options: [{ label: "small: (<$500)" }, { label: "medium: ($500 - $1000)" }, { label: "large: (>$1000)" }, { label: "extra large (>$5000)" }] },
  { label: "What Service Are You Requesting", name: "service", type: "radio", required: false, options: [{ label: "Consulting / Technical Inquiry" }, { label: "Solution Development / Implementation" }, { label: "Technology Upgrade for an Existing System" }, { label: "Quality Assurance Audit" }] },
  { label: "Organization Size", name: "orgSize", type: "radio", required: true, options: [{ label: "small (1-10 members)" }, { label: "medium (10-50 members)" }, { label: "Large (50+ members)" }] },
  { label: "What Priority is your technology need", name: "priority", type: "radio", required: false, options: [{ label: "low" }, { label: "medium" }, { label: "high" }] },
  { label: "Additional Notes for The engineers", name: "notes", type: "textarea", required: false, autoComplete: "off" },
];

export default function ConnectWithUsForm({ formClass = "connect-with-us-form-fields", onSuccess, onError }) {
  const [cwuFormdata, setCwuFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    budget: '',
    service: '',
    orgSize: '',
    priority: '',
    notes: ''
  });

  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCwuFormData({ ...cwuFormdata, [name]: value });
  };

  const handleFormSubmit = async (formData) => {
    try {
      const response = await createFollowUpRequest(formData)

      if (!response.ok) {
        console.error(result)
        throw new Error(result?.message || 'Sorry, something went wrong with this request.');
      }
      const result = await response.json();
      onSuccess?.();   
      setShowAlert(false);  
      setCwuFormData({         
        name: '',
        organization: '',
        email: '',
        phone: '',
        budget: '',
        service: '',
        orgSize: '',
        priority: '',
        notes: ''
      });
    } catch (err) {
      console.error(err);
      setShowAlert(true);
      onError?.(err.message);
    }
  };

  return (
    <article>
      <GeneralForm
        fields={connectWithUsFormFields}
        submitLabel='Submit'
        formClass={formClass}
        onSubmit={handleFormSubmit}
      />
      <br/>
      {/*Error Alert */}
      {showAlert && (
        <Alert variant="danger">
          Sorry, something went wrong. Please try again later.
        </Alert>
      )}
    </article>
  );
}
