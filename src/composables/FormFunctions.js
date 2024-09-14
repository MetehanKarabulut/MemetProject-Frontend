import axios from 'axios';

export async function handleSignUpComp(userData, router) {
    if (userData.password1 !== userData.password2) {
        alert('Şifreler aynı olmak zorundadır.');
        return;
    }

    if (userData.password1.length < 8) {
        alert('Şifrenizin minimum 8 karakter uzunluğunda olmalıdır.');
        return;
    }

    if (!userData.name || !userData.surname || !userData.eMail || !userData.phone || !userData.password1) {
        alert('Tüm alanlar doldurulmalıdır.');
        return;
    }

    try {
        const user = {
            firstName: userData.name,
            lastName: userData.surname,
            eMail: userData.eMail,
            phoneNumber: userData.phone,
            password: userData.password1,
            role: 'user'
        };
        const response = await axios.post('http://localhost:5008/signup',user, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status === 201) {
            sessionStorage.setItem('user', JSON.stringify(user));
            alert('Kayıt başarıyla tamamlandı');
            sessionStorage.removeItem('userAddress');
            router.push('/home');
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 422) {
                alert('Bu e-posta adresi zaten kullanılıyor');
                userData.eMail = '';
            } else {
                alert('Bir hata oluştu: ' + error);
                resetFormComp(userData);
            }
        } else {
            alert('Sunucuya bağlanırken bir hata oluştu');
        }
    }
}

export function showAddressBubbleComp(isAddressButtonClicked) {
    return !isAddressButtonClicked;
}

export function addAddressComp(userAddressTitle, userFullAddress, userAddress) {
    if (userAddressTitle === '' || userFullAddress === '') {
        alert('Kullanıcı tam adresini veya adres başlığını boş bırakmayınız.');
        return;
    }

    const isDuplicate = userAddress.some(address => address.userAddressTitle === userAddressTitle);
    if (isDuplicate) {
        alert('Aynı başlıkta bir adres zaten mevcuttur.');
        return;
    }

    const newAddress = {
        userAddressTitle: userAddressTitle,
        userFullAddress: userFullAddress
    };

    userAddress.push(newAddress);
    sessionStorage.setItem('userAddress', JSON.stringify(userAddress));

    return {
        userAddress:userAddress,
        isAddressButtonClicked: false
    };
}

export function resetFormComp(userData) {
    userData.name = '';
    userData.surname = '';
    userData.eMail = '';
    userData.phone = '';
    userData.password1 = '';
    userData.password2 = '';
    userData.userAddressTitle = '';
    userData.userFullAddress = '';
    userData.userAddress = [];
    sessionStorage.removeItem('userAddress');
}

export function removeAddressComp(index, userAddress) {
    userAddress.splice(index, 1);
    sessionStorage.setItem('userAddress', JSON.stringify(userAddress));
}

export function handleClickOutsideComp(event, addressBubble, setAddressButtonClicked) {
    if (addressBubble && !addressBubble.contains(event.target) && !event.target.classList.contains('addressAddingButton')) {
        setAddressButtonClicked(false);
    }
}

/**
 * Kullanıcı giriş işlemi
 * @param {string} email - Kullanıcının e-posta adresi
 * @param {string} password - Kullanıcının şifresi
 * @param {Function} onSuccess - Başarılı giriş sonrası çağrılacak fonksiyon
 * @param {Function} onFailure - Başarısız giriş sonrası çağrılacak fonksiyon
 * @param {Function} onError - Hata oluştuğunda çağrılacak fonksiyon
**/
export async function handleLogIn(email, password, onSuccess, onFailure, onError) {
    try {
        const url = 'http://localhost:5008/login';
        const response = await axios.post(url, null, {
            headers: { 'Content-Type': 'application/json' },
            params: { eMail: email, password }
        });

        if (response.status >= 200 && response.status < 300) {
            sessionStorage.setItem('user', JSON.stringify(response.data));
            if (onSuccess) onSuccess();
        } else {
            if (onFailure) onFailure();
        }
    } catch (error) {
        console.error("Hata:", error);
        if (onError) onError(error);
    }
}
