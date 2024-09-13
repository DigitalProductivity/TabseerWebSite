import { useTranslation } from 'react-i18next';
import i18n from 'i18next'; 
import { useEffect, useState } from 'react';
import ReusableTextButton from '../reusableTextButton';
import colors from '../../assets/constants/colors';
import { iconGlobe } from '../../assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from '../../core/reducer/User';

const LanguageSelecter = () => {
    const dispatch = useDispatch();
    const individualUserDetails = useSelector(state => state?.user?.individualUserDetails);

    const [currentLanguage, setCurrentLanguage] = useState(() => {
        const storedLanguage = localStorage.getItem('language');
        return storedLanguage ? storedLanguage : 'en';
    });

    useEffect(() => {
        const preferredLanguage = individualUserDetails?.preferredLanguage;
        if (preferredLanguage && !localStorage.getItem('initialLoad')) {
            setCurrentLanguage(preferredLanguage === 2 ? 'ar' : 'en');
            localStorage.setItem('language', preferredLanguage === 2 ? 'ar' : 'en');
            localStorage.setItem('initialLoad', 'value');
        }
    }, [individualUserDetails]);

    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
        document.body.dir = i18n.dir(currentLanguage);
        localStorage.setItem('language', currentLanguage);
    }, [currentLanguage]);

    const toggleLanguage = () => {
        setCurrentLanguage(currentLanguage === 'en' ? 'ar' : 'en');
    };

    useEffect(() => {
        dispatch(fetchUserDetails());
    }, [dispatch]);

    const { t } = useTranslation();

    return (
        <div className='d-flex gap-1' style={{ background: colors.primaryColor, width: "auto", borderRadius: "5px", cursor: "pointer", padding: '5px 0px' }} onClick={toggleLanguage}>
            <img src={iconGlobe} style={{ height: "auto", width: "30px" }} alt="Globe icon" />
            <ReusableTextButton backgroundColor={colors.primaryColor} color={"white"} buttonName={currentLanguage === 'en' ? t('Arabic') : t('English')} buttonWidth={"70px"} buttonHeight={"30px"} />
        </div>
    );
};

export default LanguageSelecter;
