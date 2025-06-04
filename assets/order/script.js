document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('order-form');
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-success-modal');
    const packagePrices = {
    'basic': 'Rp 350.000',
    'standard': 'Rp 750.000', 
    'premium': 'Rp 1.300.000'
};
    
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error messages
        clearErrors();
        
        // Validasi form
        if (validateForm()) {
            // Jika valid, kirim ke WhatsApp
            sendToWhatsApp();
        }
    });
    
    closeModalBtn.addEventListener('click', function() {
        successModal.style.display = 'none';
    });
    
    function validateForm() {
        let isValid = true;
        
        // Validasi Nama
        const name = document.getElementById('name').value.trim();
        if (name.length < 3) {
            showError('name-error', 'Nama minimal 3 karakter');
            isValid = false;
        }
        
        // Validasi Email
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('email-error', 'Email tidak valid');
            isValid = false;
        }
        
        // Validasi Nomor WhatsApp
        const phone = document.getElementById('phone').value.trim();
        const phoneRegex = /^(\+62|62|0)[1-9][0-9]{6,12}$/;
        if (!phoneRegex.test(phone)) {
            showError('phone-error', 'Format WhatsApp tidak valid (gunakan 08...)');
            isValid = false;
        }
        
        // Validasi Jenis Website
        const websiteType = document.getElementById('website-type').value;
        if (!websiteType) {
            showError('website-type-error', 'Pilih jenis website');
            isValid = false;
        }
        
        // Validasi Paket
        const package = document.getElementById('package').value;
        if (!package) {
            showError('package-error', 'Pilih paket');
            isValid = false;
        }
        
        // Validasi Domain
        const domain = document.getElementById('domain').value.trim();
        const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
        if (!domainRegex.test(domain)) {
            showError('domain-error', 'Format domain tidak valid (contoh: bisnisku.com)');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showError(elementId, message) {
        const element = document.getElementById(elementId);
        element.textContent = message;
        element.style.display = 'block';
    }
    
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(el => {
            el.textContent = '';
            el.style.display = 'none';
        });
    }
    function sendToWhatsApp() {
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        websiteType: document.getElementById('website-type').value,
        package: document.getElementById('package').value,
        domain: document.getElementById('domain').value.trim(),
        notes: document.getElementById('notes').value.trim()
    };
    
    // Format nomor customer
    let customerWA = formData.phone.replace(/^\+62|^0/, '62').replace(/\D/g, '');
    
    // Nomor admin (ganti dengan nomor Anda)
    const adminWA = '6283824225539'; // Contoh nomor admin
    
    // Pesan untuk admin
    const adminMessage = `🚀 ORDER BARU!
Nama: ${formData.name}
Email: ${formData.email}
No. WA: https://wa.me/${customerWA}
Jenis Website: ${formData.websiteType}
Paket: ${formData.package}
Domain: ${formData.domain}
Catatan: ${formData.notes || '-'}`;

    // Pesan untuk customer
    const customerMessage = `Halo ${formData.name},
Terima kasih telah memesan website!

📌 Detail Order:
Jenis: ${formData.websiteType}
Paket: ${formData.package}
Domain: ${formData.domain}

Kami akan segera menghubungi Anda via WhatsApp.`;

    // Kirim ke admin (CC)
    window.open(`https://wa.me/${adminWA}?text=${encodeURIComponent(adminMessage)}`, '_blank');
    
    // Kirim ke customer
    window.open(`https://wa.me/${customerWA}?text=${encodeURIComponent(customerMessage)}`, '_blank');

    // Tampilkan modal sukses
    successModal.style.display = 'flex';
    
    // Reset form
    setTimeout(() => {
        orderForm.reset();
        successModal.style.display = 'none';
    }, 3000);
    }

});
