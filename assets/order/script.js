document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('orderForm');
    
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = {
            nama: document.getElementById('nama').value,
            email: document.getElementById('email').value,
            telepon: document.getElementById('telepon').value,
            alamat: document.getElementById('alamat').value,
            jenis_website: document.getElementById('jenis_website').value,
            kategori: document.getElementById('kategori').value,
            fitur_tambahan: Array.from(document.querySelectorAll('input[name="fitur_tambahan[]"]:checked')).map(el => el.value),
            catatan: document.getElementById('catatan').value,
            paket: document.querySelector('input[name="paket"]:checked').value,
            payment_method: document.querySelector('input[name="payment_method"]:checked').value,
            dp_amount: document.getElementById('dp_amount').value
        };
        
        // Calculate total amount based on package
        let packagePrice;
        switch(formData.paket) {
            case 'basic':
                packagePrice = 2500000;
                break;
            case 'standard':
                packagePrice = 5000000;
                break;
            case 'premium':
                packagePrice = 10000000;
                break;
            default:
                packagePrice = 2500000;
        }
        
        // Calculate DP amount
        const dpPercentage = parseInt(formData.dp_amount);
        const dpAmount = Math.round(packagePrice * (dpPercentage / 100));
        
        // Prepare transaction details for Midtrans
        const transactionDetails = {
            transaction_details: {
                order_id: 'WEB-' + new Date().getTime(),
                gross_amount: dpAmount
            },
            customer_details: {
                first_name: formData.nama.split(' ')[0],
                last_name: formData.nama.split(' ').slice(1).join(' '),
                email: formData.email,
                phone: formData.telepon,
                billing_address: {
                    address: formData.alamat
                }
            },
            item_details: [
                {
                    id: formData.paket,
                    price: dpAmount,
                    quantity: 1,
                    name: 'DP Pembuatan Website Paket ' + formData.paket.charAt(0).toUpperCase() + formData.paket.slice(1) + ' (' + dpPercentage + '%)'
                }
            ],
            payment_type: formData.payment_method === 'credit_card' ? 'credit_card' : 
                         formData.payment_method === 'gopay' ? 'gopay' :
                         formData.payment_method === 'shopeepay' ? 'shopeepay' : 'bank_transfer'
        };
        
        // Save form data to localStorage (for demo purposes)
        localStorage.setItem('webOrderData', JSON.stringify(formData));
        
        // Call Midtrans Snap API
        snap.pay(transactionDetails, {
            onSuccess: function(result) {
                console.log('Payment success:', result);
                alert('Pembayaran berhasil! Kami akan segera menghubungi Anda untuk proses selanjutnya.');
                // You can redirect to thank you page or clear form here
            },
            onPending: function(result) {
                console.log('Payment pending:', result);
                alert('Pembayaran Anda sedang diproses. Silakan selesaikan pembayaran sesuai instruksi.');
            },
            onError: function(result) {
                console.log('Payment error:', result);
                alert('Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi.');
            },
            onClose: function() {
                console.log('Payment popup closed');
                // Handle when customer close the popup without finishing the payment
            }
        });
    });
    
    // Dynamic price calculation (optional)
    const packageRadios = document.querySelectorAll('input[name="paket"]');
    const dpSelect = document.getElementById('dp_amount');
    
    function updateDPOptions() {
        const selectedPackage = document.querySelector('input[name="paket"]:checked').value;
        let packagePrice;
        
        switch(selectedPackage) {
            case 'basic':
                packagePrice = 2500000;
                break;
            case 'standard':
                packagePrice = 5000000;
                break;
            case 'premium':
                packagePrice = 10000000;
                break;
        }
        
        // You can update UI to show the calculated DP amount here
        console.log('Selected package:', selectedPackage, 'Price:', packagePrice);
    }
    
    packageRadios.forEach(radio => {
        radio.addEventListener('change', updateDPOptions);
    });
    
    dpSelect.addEventListener('change', updateDPOptions);
    
    // Initialize
    updateDPOptions();
});