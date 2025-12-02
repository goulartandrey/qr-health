import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import api from '../api/api';
import Actions from '../components/Actions';
import ClinicalInfoSection from '../components/ClinicalInfoSection';
import UserHeader from '../components/Header';
import UserInformation from '../components/UserInformation';

export default function ClininfoDashboard() {
  const [allergiesOpen, setAllergiesOpen] = useState(false);
  const [medicationsOpen, setMedicationsOpen] = useState(false);
  const [diseasesOpen, setDiseasesOpen] = useState(false);
  const [surgeriesOpen, setSurgeriesOpen] = useState(false);

  const [allergiesItems, setAllergiesItems] = useState([]);
  const [medicationsItems, setMedicationsItems] = useState([]);
  const [diseasesItems, setDiseasesItems] = useState([]);
  const [surgeriesItems, setSurgeriesItems] = useState([]);

  const [newAllergyInput, setNewAllergyInput] = useState('');
  const [newMedicationInput, setNewMedicationInput] = useState('');
  const [newDiseaseInput, setNewDiseaseInput] = useState('');
  const [newSurgeryInput, setNewSurgeryInput] = useState('');

  const [publicPassword, setPublicPassword] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [gender, setGender] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState(undefined);
  const [originalData, setOriginalData] = useState(null);
  const [clinicalBadge, setClinicalBadge] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const decoded = jwtDecode(token);

    api
      .get(`/users/${decoded.sub}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!user) return;

    if (user.clinicalInfo) {
      const info = user.clinicalInfo;

      setAllergiesItems(info.allergies || []);
      setMedicationsItems(info.medicines || []);
      setDiseasesItems(info.chronicDiseases || []);
      setSurgeriesItems(info.surgeries || []);

      setBloodType(info.bloodType || '');
      setGender(info.gender || '');
      setEmergencyContact(info.emergencyContact || '');

      setOriginalData({
        allergies: info.allergies || [],
        medicines: info.medicines || [],
        chronicDiseases: info.chronicDiseases || [],
        surgeries: info.surgeries || [],
        bloodType: info.bloodType || '',
        gender: info.gender || '',
        emergencyContact: info.emergencyContact || '',
      });
    } else {
      setAllergiesItems([]);
      setMedicationsItems([]);
      setDiseasesItems([]);
      setSurgeriesItems([]);
      setBloodType('');
      setGender('');
      setEmergencyContact('');
    }

    setClinicalBadge(user.clinicalBadge || null);
    setPublicPassword(user.clinicalBadge?.publicPassword || '');
  }, [user]);

  const addItem = (setter, items, input, setInput) => {
    if (input.trim()) {
      setter([...items, input.trim()]);
      setInput('');
    }
  };

  const removeItem = (setter, items, index) => {
    setter(items.filter((_, i) => i !== index));
  };

  const handleSaveClinicalInfo = async () => {
    try {
      if (!bloodType) {
        alert('Selecione um tipo sanguíneo.');
        return;
      }

      if (!gender) {
        alert('Informe seu sexo.');
        return;
      }

      if (!emergencyContact || emergencyContact.trim() === '') {
        alert('Informe um contato de emergência.');
        return;
      }

      if (emergencyContact.length !== 11) {
        alert('O contato de emergência deve conter 11 dígitos.');
        return;
      }

      const payload = {
        allergies: allergiesItems,
        medicines: medicationsItems,
        chronicDiseases: diseasesItems,
        surgeries: surgeriesItems,
        bloodType: bloodType,
        gender: gender,
        emergencyContact: emergencyContact,
        userId: user.id,
      };

      let clinicalInfoResponse;

      if (user.clinicalInfo?.id) {
        clinicalInfoResponse = await api.patch(
          `/clinical_infos/${user.clinicalInfo.id}`,
          payload,
        );
      } else {
        clinicalInfoResponse = await api.post(`/clinical_infos`, payload);
      }

      setUser((prev) => ({
        ...prev,
        clinicalInfo: clinicalInfoResponse.data,
      }));

      setOriginalData({
        allergies: allergiesItems,
        medicines: medicationsItems,
        chronicDiseases: diseasesItems,
        surgeries: surgeriesItems,
        publicPassword: publicPassword,
        bloodType: bloodType,
        gender: gender,
        emergencyContact: emergencyContact,
      });

      alert('Informações clínicas salvas com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar informações clínicas.');
    }
  };

  const handleGenerateQRCode = async () => {
    try {
      if (!publicPassword || publicPassword.trim() === '') {
        alert('Defina uma senha pública antes de gerar o QR Code!');
        return;
      }

      if (!user.clinicalInfo?.id) {
        alert('Salve suas informações clínicas antes de gerar o QR Code!');
        return;
      }

      const badgePayload = {
        userId: user.id,
        clinicalInfoId: user.clinicalInfo.id,
        publicPassword: publicPassword,
      };

      let clinicalBadgeResponse;

      if (clinicalBadge?.id) {
        clinicalBadgeResponse = await api.patch(
          `/clinical_badges/${clinicalBadge?.id}`,
          badgePayload,
        );
        alert('QR Code atualizado com sucesso!');
      } else {
        try {
          clinicalBadgeResponse = await api.post(
            `/clinical_badges`,
            badgePayload,
          );
          alert('QR Code gerado com sucesso!');
        } catch (error) {
          if (
            error.response?.status === 409 ||
            error.response?.status === 400
          ) {
            clinicalBadgeResponse = await api.patch(
              `/clinical_badges/${clinicalBadge?.id}`,
              badgePayload,
            );
            alert('QR Code atualizado com sucesso!');
          } else {
            throw error;
          }
        }
      }
      setUser((prev) => ({
        ...prev,
        clinicalBadge: clinicalBadgeResponse.data,
      }));

      setClinicalBadge(clinicalBadgeResponse.data);
    } catch (error) {
      console.error(error);
      alert('Erro ao gerar QR Code.');
    }
  };

  const hasChanges = () => {
    const isFirstCreation = !user?.clinicalInfo?.id;

    if (isFirstCreation) {
      const someFieldFilled =
        allergiesItems.length > 0 ||
        medicationsItems.length > 0 ||
        diseasesItems.length > 0 ||
        surgeriesItems.length > 0 ||
        (bloodType && bloodType.trim() !== '') ||
        (gender && gender.trim() !== '') ||
        (emergencyContact && emergencyContact.trim() !== '');

      return someFieldFilled;
    }

    if (!originalData) return true;

    const arraysEqual = (a = [], b = []) => {
      if (a.length !== b.length) return false;
      return a.every((item, i) => String(item) === String(b[i]));
    };

    const sameArrays =
      arraysEqual(allergiesItems, originalData.allergies) &&
      arraysEqual(medicationsItems, originalData.medicines) &&
      arraysEqual(diseasesItems, originalData.chronicDiseases) &&
      arraysEqual(surgeriesItems, originalData.surgeries);

    const sameStrings =
      String(bloodType || '') === String(originalData.bloodType || '') &&
      String(gender || '') === String(originalData.gender || '') &&
      String(emergencyContact || '').trim() ===
        String(originalData.emergencyContact || '').trim();

    return !(sameArrays && sameStrings);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader logout={handleLogout} />
      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 gap-6">
          <UserInformation
            user={user}
            bloodType={bloodType}
            setBloodType={setBloodType}
            gender={gender}
            setGender={setGender}
            emergencyContact={emergencyContact}
            setEmergencyContact={setEmergencyContact}
            publicPassword={publicPassword}
            setPublicPassword={setPublicPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            isEditingPassword={isEditingPassword}
            setIsEditingPassword={setIsEditingPassword}
          />
          <div className="space-y-4">
            <ClinicalInfoSection
              title="Alergias"
              open={allergiesOpen}
              setOpen={setAllergiesOpen}
              items={allergiesItems}
              setItems={setAllergiesItems}
              addItem={addItem}
              removeItem={removeItem}
              newInput={newAllergyInput}
              setNewInput={setNewAllergyInput}
            />
            <ClinicalInfoSection
              title="Medicamentos utilizados"
              open={medicationsOpen}
              setOpen={setMedicationsOpen}
              items={medicationsItems}
              setItems={setMedicationsItems}
              addItem={addItem}
              removeItem={removeItem}
              newInput={newMedicationInput}
              setNewInput={setNewMedicationInput}
            />

            <ClinicalInfoSection
              title="Doenças crônicas"
              open={diseasesOpen}
              setOpen={setDiseasesOpen}
              items={diseasesItems}
              setItems={setDiseasesItems}
              addItem={addItem}
              removeItem={removeItem}
              newInput={newDiseaseInput}
              setNewInput={setNewDiseaseInput}
            />

            <ClinicalInfoSection
              title="Cirurgias"
              open={surgeriesOpen}
              setOpen={setSurgeriesOpen}
              items={surgeriesItems}
              setItems={setSurgeriesItems}
              addItem={addItem}
              removeItem={removeItem}
              newInput={newSurgeryInput}
              setNewInput={setNewSurgeryInput}
            />
          </div>
        </div>
        <Actions
          saveClinical={handleSaveClinicalInfo}
          hasChanges={hasChanges}
          generateQr={handleGenerateQRCode}
          clinicalBadge={clinicalBadge}
          user={user}
          publicPassword={publicPassword}
        />
      </main>
    </div>
  );
}
