/**
 * TESTE DO MODAL ATUALIZADO
 * Verifica se as mudanças foram aplicadas corretamente
 */

// Função para testar o modal atualizado
function testUpdatedModal() {
    console.log('🧪 Testando modal atualizado...');
    
    const testData = {
        pix_code: '00020126580014BR.GOV.BCB.PIX0136123e4567-e12b-12d1-a456-426614174000520400005303986540519.905802BR5913STELLA BEGHINI6009SAO PAULO61080540900062070503***6304ABCD',
        amount: 19.90,
        id: 'test-modal-updated-' + Date.now()
    };
    
    // Testar modal atualizado
    if (window.showPaymentModal) {
        console.log('✅ Usando modal de pagamento atualizado');
        window.showPaymentModal({
            pix_qr_code: testData.pix_code,
            pix_copy_paste: testData.pix_code,
            amount: testData.amount,
            identifier: testData.id,
            status: 'pending'
        });
    } else {
        console.error('❌ Modal de pagamento não está disponível');
        alert('Teste: Modal não disponível!');
    }
}

// Função para verificar as funcionalidades atualizadas
function checkUpdatedFeatures() {
    console.log('🔍 Verificando funcionalidades atualizadas...');
    
    // Verificar se o modal existe
    if (window.PaymentModal) {
        console.log('✅ PaymentModal encontrado');
        
        // Verificar se tem o método addStyles
        if (typeof window.PaymentModal.addStyles === 'function') {
            console.log('✅ Método addStyles disponível');
        } else {
            console.warn('⚠️ Método addStyles não encontrado');
        }
        
        // Verificar se tem o método showMiniToast
        if (typeof window.PaymentModal.showMiniToast === 'function') {
            console.log('✅ Método showMiniToast disponível');
        } else {
            console.warn('⚠️ Método showMiniToast não encontrado');
        }
        
        // Verificar se tem o método fallbackCopy
        if (typeof window.PaymentModal.fallbackCopy === 'function') {
            console.log('✅ Método fallbackCopy disponível');
        } else {
            console.warn('⚠️ Método fallbackCopy não encontrado');
        }
        
    } else {
        console.error('❌ PaymentModal não encontrado');
    }
    
    // Verificar se o objeto syncPay foi atualizado
    if (window.syncPay && window.syncPay.showPixModal) {
        console.log('✅ Objeto syncPay encontrado e atualizado');
    } else {
        console.warn('⚠️ Objeto syncPay não encontrado ou não atualizado');
    }
}

// Executar testes automaticamente após carregamento
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        console.log('🚀 Executando testes do modal atualizado...');
        checkUpdatedFeatures();
        
        // Adicionar botão de teste na página (apenas para debug)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            const testButton = document.createElement('button');
            testButton.textContent = '🧪 Testar Modal Atualizado';
            testButton.style.cssText = `
                position: fixed;
                bottom: 80px;
                left: 20px;
                z-index: 9999;
                padding: 10px 15px;
                background: linear-gradient(45deg, #28a745, #20c997);
                color: white;
                border: none;
                border-radius: 20px;
                font-weight: 500;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                font-size: 12px;
            `;
            testButton.onclick = testUpdatedModal;
            document.body.appendChild(testButton);
        }
        
    }, 3000);
});

console.log('🧪 Script de teste do modal atualizado carregado');