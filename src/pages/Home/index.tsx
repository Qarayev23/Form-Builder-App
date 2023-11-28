import { useState } from 'react';
import useFormBuilder from '../../hooks/useFormBuilder';
import FormBuilder from '../../components/FormBuilder';
import FormModal from '../../components/FormModal';
import FormList from '../../components/FormList';

const Home = () => {
    const [visible, setVisible] = useState(false);
    const form = useFormBuilder();
    const openModal = () => setVisible(true);
    const closeModal = () => setVisible(false);

    return (
        <>
            <FormBuilder form={form} openModal={openModal} />
            {visible && <FormModal visible={visible} closeModal={closeModal} form={form} />}
            <FormList form={form} />
        </>
    )
}

export default Home