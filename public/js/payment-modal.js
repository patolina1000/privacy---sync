/**
 * MODAL DE PAGAMENTO ATUALIZADO
 * Exibe tela de pagamento com design moderno e funcionalidades robustas
 * Baseado no pop-up alternativo com melhorias
 */

class PaymentModal {
    constructor() {
        this.modal = null;
        this.overlay = null;
        this.isOpen = false;
        this.currentTransaction = null;
        this.statusCheckInterval = null;
        this.init();
    }

    init() {
        this.createModalHTML();
        this.bindEvents();
    }

    createModalHTML() {
        // Criar overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'payment-modal-overlay';
        this.overlay.id = 'paymentModalOverlay';

        // Criar modal
        this.modal = document.createElement('div');
        this.modal.className = 'payment-modal';
        this.modal.id = 'paymentModal';

        this.modal.innerHTML = `
            <div class="payment-modal-header">
                <button class="payment-modal-close" id="paymentModalClose">
                    ×
                </button>
                <div class="payment-profile">
                    <div class="payment-profile-avatar">
                        <img src="images/perfil.jpg" alt="Perfil" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMzAiIGZpbGw9IiNGNTgxNzAiLz4KPHN2ZyB4PSIxNSIgeT0iMTUiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik0xMiAyQzEzLjEgMiAxNCAyLjkgMTQgNEMxNCA1LjEgMTMuMSA2IDEyIDZDMTAuOSA2IDEwIDUuMSAxMCA0QzEwIDIuOSAxMC45IDIgMTIgMlpNMjEgOVYyMkgxNVYxM0g5VjIySDNWOUgwVjdIMjRWOUgyMVoiLz4KPHN2Zz4KPC9zdmc+';">
                    </div>
                    <div class="payment-profile-info">
                        <h3>Stella Beghini</h3>
                        <p>@stella_beghini</p>
                    </div>
                </div>
            </div>
            
            <div class="payment-modal-body">
                <div class="payment-benefits">
                    <h4>Benefícios Exclusivos</h4>
                    <ul class="payment-benefits-list">
                        <li>Acesso ao conteúdo</li>
                        <li>Chat exclusivo com o criador</li>
                        <li>Cancele a qualquer hora</li>
                    </ul>
                </div>
                
                <div class="payment-plan">
                    <p class="payment-plan-label">Formas de pagamento</p>
                    <p class="payment-plan-duration">Valor</p>
                    <p class="payment-plan-price" id="paymentPlanPrice">R$ 15,00</p>
                </div>
                
                <div class="payment-pix">
                    <p class="payment-pix-label">CHAVE PIX</p>
                    <div class="payment-pix-code" id="paymentPixCode">
                        Gerando código PIX...
                    </div>
                    <button class="payment-copy-button" id="paymentCopyButton">
                        COPIAR CHAVE PIX
                    </button>
                </div>
                
                <div class="payment-qr-container" id="paymentQRContainer">
                    <div class="payment-qr-code" id="paymentQRCode">
                        <!-- QR Code será inserido aqui -->
                    </div>
                </div>
                
                <div class="payment-status" id="paymentStatus">
                    <p class="payment-status-text">Aguardando pagamento...</p>
                </div>
            </div>
        `;

        this.overlay.appendChild(this.modal);
        document.body.appendChild(this.overlay);
        
        // Adicionar estilos CSS dinamicamente
        this.addStyles();
    }

    addStyles() {
        // Verificar se os estilos já foram adicionados
        if (document.getElementById('payment-modal-styles')) {
            return;
        }

        const styles = document.createElement('style');
        styles.id = 'payment-modal-styles';
        styles.textContent = `
            .payment-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                box-sizing: border-box;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }

            .payment-modal-overlay.show {
                opacity: 1;
                visibility: visible;
            }

            .payment-modal {
                background: white;
                border-radius: 20px;
                padding: 0;
                max-width: 500px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                transform: scale(0.8);
                transition: transform 0.3s ease;
                color: #333;
                position: relative;
                margin: auto;
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
            }

            /* Tamanho maior apenas para PC/Desktop */
            @media (min-width: 769px) {
                .payment-modal {
                    max-width: 550px;
                    width: 80%;
                }
            }

            .payment-modal-overlay.show .payment-modal {
                transform: scale(1);
            }

            .payment-modal-header {
                background-image: url('../images/banner.jpg');
                background-size: cover;
                background-position: center;
                padding: 20px;
                border-radius: 20px 20px 0 0;
                position: relative;
                height: 140px;
                display: flex;
                align-items: flex-end;
            }

            .payment-modal-header::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%);
                border-radius: 20px 20px 0 0;
            }

            .payment-modal-close {
                position: absolute;
                top: 15px;
                right: 15px;
                background: rgba(255, 255, 255, 0.9);
                border: none;
                color: #333;
                font-size: 18px;
                cursor: pointer;
                width: 35px;
                height: 35px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.2s;
                z-index: 2;
            }

            .payment-modal-close:hover {
                background: white;
                transform: scale(1.1);
            }

            .payment-profile {
                display: flex;
                align-items: center;
                gap: 15px;
                margin-right: 40px;
                position: relative;
                z-index: 1;
            }

            .payment-profile-avatar {
                width: 70px;
                height: 70px;
                border-radius: 50%;
                overflow: hidden;
                border: 4px solid white;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
            }

            .payment-profile-avatar img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .payment-profile-info h3 {
                margin: 0;
                font-size: 18px;
                font-weight: 700;
                color: white;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
            }

            .payment-profile-info p {
                margin: 2px 0 0 0;
                color: rgba(255, 255, 255, 0.9);
                font-size: 14px;
                text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
            }

            .payment-modal-body {
                padding: 25px;
            }

            .payment-benefits {
                margin-bottom: 20px;
            }

            .payment-benefits h4 {
                color: #333;
                margin: 0 0 8px 0;
                font-size: 16px;
                font-weight: 600;
                text-align: left;
            }

            .payment-benefits-list {
                list-style: none;
                padding: 0;
                margin: 0;
            }

            .payment-benefits-list li {
                padding: 1px 0;
                padding-left: 25px;
                position: relative;
                font-size: 14px;
                color: #666;
                line-height: 1.2;
            }

            .payment-benefits-list li:before {
                content: '✓';
                position: absolute;
                left: 0;
                color: #F58170;
                font-weight: bold;
            }

            .payment-plan {
                text-align: left;
                margin-bottom: 25px;
                padding: 20px;
                background: #f8f9fa;
                border-radius: 15px;
            }

            .payment-plan-label {
                color: #333;
                font-size: 16px;
                font-weight: 600;
                margin: 0 0 5px 0;
                text-transform: none;
                letter-spacing: normal;
            }

            .payment-plan-duration {
                color: #666;
                font-size: 14px;
                margin: 0 0 10px 0;
            }

            .payment-plan-price {
                color: #333;
                font-size: 28px;
                font-weight: 700;
                margin: 0;
            }

            .payment-pix {
                margin-bottom: 20px;
            }

            .payment-pix-label {
                color: #333;
                font-size: 14px;
                font-weight: 600;
                margin: 0 0 15px 0;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                text-align: left;
            }

            .payment-pix-code {
                background: #f8f9fa;
                border: 2px solid #eee;
                border-radius: 10px;
                padding: 15px;
                margin-bottom: 15px;
                font-family: 'Courier New', monospace;
                font-size: 12px;
                word-break: break-all;
                color: #666;
                line-height: 1.4;
            }

            .payment-copy-button {
                width: 100%;
                background: linear-gradient(45deg, #F58170, #F9AF77);
                color: white;
                border: none;
                padding: 15px;
                border-radius: 10px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
                font-size: 14px;
                letter-spacing: 0.5px;
            }

            .payment-copy-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(245, 129, 112, 0.4);
            }

            .payment-copy-button:active {
                transform: translateY(0);
            }

            .payment-copy-button:disabled {
                opacity: 0.6;
                cursor: not-allowed;
                transform: none;
            }

            .payment-qr-container {
                text-align: center;
                margin: 20px 0;
                padding: 20px;
                background: white;
                border: 2px solid #eee;
                border-radius: 15px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                display: none;
            }

            .payment-qr-code {
                display: inline-block;
                padding: 15px;
                background: white;
                border-radius: 10px;
            }

            .payment-status {
                text-align: center;
                padding: 15px;
                border-radius: 10px;
                background: rgba(23, 162, 184, 0.1);
                border: 1px solid rgba(23, 162, 184, 0.3);
            }

            .payment-status.success {
                background: rgba(40, 167, 69, 0.1);
                border-color: rgba(40, 167, 69, 0.3);
            }

            .payment-status.error {
                background: rgba(220, 53, 69, 0.1);
                border-color: rgba(220, 53, 69, 0.3);
            }

            .payment-status-text {
                margin: 0;
                font-size: 14px;
                color: #17a2b8;
            }

            .payment-status.success .payment-status-text {
                color: #28a745;
            }

            .payment-status.error .payment-status-text {
                color: #dc3545;
            }

            @media (max-width: 768px) {
                .payment-modal {
                    width: 95%;
                    margin: 20px;
                }
                
                .payment-modal-header {
                    height: 100px;
                    padding: 15px;
                }
                
                .payment-profile-avatar {
                    width: 50px;
                    height: 50px;
                }
                
                .payment-profile-info h3 {
                    font-size: 16px;
                }
                
                .payment-modal-body {
                    padding: 20px;
                }
                
                .payment-plan-price {
                    font-size: 24px;
                }
            }

            @media (max-width: 480px) {
                .payment-modal {
                    width: 98%;
                    margin: 10px;
                }
                
                .payment-modal-header {
                    height: 80px;
                    padding: 10px;
                }
                
                .payment-profile {
                    gap: 10px;
                }
                
                .payment-profile-avatar {
                    width: 45px;
                    height: 45px;
                }
                
                .payment-profile-info h3 {
                    font-size: 15px;
                }

                .payment-modal-body {
                    padding: 15px;
                }
            }
        `;

        document.head.appendChild(styles);
    }

    bindEvents() {
        // Fechar modal
        const closeBtn = document.getElementById('paymentModalClose');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }

        // Fechar clicando no overlay
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });

        // Copiar chave PIX
        const copyBtn = document.getElementById('paymentCopyButton');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => this.copyPixCode());
        }

        // Fechar com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    async show(transactionData) {
        if (!transactionData) {
            console.error('Dados da transação são obrigatórios');
            return;
        }

        this.currentTransaction = transactionData;
        this.updateModalContent(transactionData);
        
        // Mostrar modal com animação
        this.overlay.classList.add('show');
        this.isOpen = true;
        
        // Gerar QR Code se houver dados PIX
        if (transactionData.pix_qr_code || transactionData.pix_copy_paste || transactionData.pix_code) {
            const pixCode = transactionData.pix_qr_code || transactionData.pix_copy_paste || transactionData.pix_code;
            await this.generateQRCode(pixCode);
        }

        // Iniciar verificação de status
        this.startStatusCheck();
        
        console.log('✅ Modal de pagamento aberto com sucesso');
    }

    updateModalContent(data) {
        // Atualizar preço
        const priceElement = document.getElementById('paymentPlanPrice');
        if (priceElement && data.amount) {
            const formattedPrice = this.formatCurrency(data.amount);
            priceElement.textContent = formattedPrice;
        }

        // Atualizar código PIX
        const pixCodeElement = document.getElementById('paymentPixCode');
        if (pixCodeElement) {
            let pixCode = '';
            if (data.pix_qr_code) {
                pixCode = data.pix_qr_code;
            } else if (data.pix_copy_paste) {
                pixCode = data.pix_copy_paste;
            } else if (data.pix_code) {
                pixCode = data.pix_code;
            } else if (data.qr_code) {
                pixCode = data.qr_code;
            } else {
                pixCode = 'Código PIX será gerado em breve...';
            }
            
            pixCodeElement.textContent = pixCode;
            
            // Habilitar/desabilitar botão de copiar
            const copyBtn = document.getElementById('paymentCopyButton');
            if (copyBtn) {
                copyBtn.disabled = !pixCode || pixCode.includes('será gerado') || pixCode.includes('não disponível');
            }
        }

        // Atualizar status
        this.updateStatus('pending', 'Aguardando pagamento...');
        
        console.log('✅ Modal atualizado com dados:', data);
    }

    async generateQRCode(pixCode) {
        try {
            const qrContainer = document.getElementById('paymentQRContainer');
            const qrCodeElement = document.getElementById('paymentQRCode');
            
            if (!qrCodeElement) {
                console.warn('⚠️ Elemento QR Code não encontrado');
                return;
            }

            // Limpar QR Code anterior
            qrCodeElement.innerHTML = '';
            
            if (typeof QRCode !== 'undefined') {
                // Usar QRCode.js se disponível
                await QRCode.toCanvas(qrCodeElement, pixCode, {
                    width: 200,
                    height: 200,
                    margin: 2,
                    color: {
                        dark: '#333333',
                        light: '#FFFFFF'
                    }
                });
                console.log('✅ QR Code gerado com QRCode.js');
            } else {
                // Fallback para API online
                const img = document.createElement('img');
                img.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(pixCode)}`;
                img.alt = 'QR Code PIX';
                img.style.maxWidth = '200px';
                img.style.height = 'auto';
                qrCodeElement.appendChild(img);
                console.log('✅ QR Code gerado com API fallback');
            }
            
            if (qrContainer) {
                qrContainer.style.display = 'block';
            }
        } catch (error) {
            console.error('❌ Erro ao gerar QR Code:', error);
            const qrContainer = document.getElementById('paymentQRContainer');
            if (qrContainer) {
                qrContainer.style.display = 'none';
            }
        }
    }

    copyPixCode() {
        const pixCodeElement = document.getElementById('paymentPixCode');
        if (pixCodeElement) {
            const pixCode = pixCodeElement.textContent.trim();
            
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(pixCode).then(() => {
                    this.showCopyFeedback();
                }).catch(err => {
                    console.error('Erro ao copiar:', err);
                    this.fallbackCopy(pixCode);
                });
            } else {
                this.fallbackCopy(pixCode);
            }
        }
    }

    fallbackCopy(text) {
        // Método alternativo para copiar
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showCopyFeedback();
        } catch (err) {
            console.error('Erro ao copiar:', err);
            alert('Código PIX: ' + text);
        }
        
        document.body.removeChild(textArea);
    }

    showCopyFeedback() {
        const copyBtn = document.getElementById('paymentCopyButton');
        if (copyBtn) {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'COPIADO!';
            copyBtn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.background = 'linear-gradient(45deg, #F58170, #F9AF77)';
            }, 2000);
        }
        
        this.showMiniToast('Código PIX copiado!');
    }

    showMiniToast(message) {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(-100%);
            background: linear-gradient(45deg, #28a745, #20c997);
            color: white;
            padding: 10px 20px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 500;
            z-index: 10001;
            transition: transform 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(0)';
        }, 100);
        
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(-100%)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 2000);
    }

    updateStatus(status, message) {
        const statusElement = document.getElementById('paymentStatus');
        const statusText = document.querySelector('.payment-status-text');
        
        if (statusElement && statusText) {
            // Remover classes de status anteriores
            statusElement.classList.remove('success', 'error');
            
            // Adicionar nova classe de status
            if (status === 'success') {
                statusElement.classList.add('success');
            } else if (status === 'error') {
                statusElement.classList.add('error');
            }
            
            statusText.textContent = message;
        }
    }

    startStatusCheck() {
        if (!this.currentTransaction || !this.currentTransaction.identifier) {
            return;
        }

        // Verificar status a cada 5 segundos
        this.statusCheckInterval = setInterval(async () => {
            try {
                const status = await this.checkTransactionStatus();
                
                if (status) {
                    if (status.status === 'paid' || status.status === 'completed') {
                        this.updateStatus('success', 'Pagamento confirmado! ✓');
                        this.stopStatusCheck();
                        
                        // Fechar modal após 3 segundos
                        setTimeout(() => {
                            this.close();
                            this.showToast('Pagamento realizado com sucesso!', 'success');
                        }, 3000);
                        
                    } else if (status.status === 'expired' || status.status === 'cancelled') {
                        this.updateStatus('error', 'Pagamento expirado ou cancelado');
                        this.stopStatusCheck();
                    }
                }
            } catch (error) {
                console.error('Erro ao verificar status:', error);
            }
        }, 5000);
    }

    async checkTransactionStatus() {
        if (!this.currentTransaction || !this.currentTransaction.identifier) {
            return null;
        }

        try {
            if (window.SyncPayIntegration && window.SyncPayIntegration.getTransactionStatus) {
                return await window.SyncPayIntegration.getTransactionStatus(this.currentTransaction.identifier);
            }
        } catch (error) {
            console.error('Erro ao consultar status da transação:', error);
            return null;
        }
    }

    stopStatusCheck() {
        if (this.statusCheckInterval) {
            clearInterval(this.statusCheckInterval);
            this.statusCheckInterval = null;
        }
    }

    close() {
        if (!this.isOpen) return;
        
        this.overlay.classList.remove('show');
        this.isOpen = false;
        this.stopStatusCheck();
        
        // Remover modal do DOM após animação
        setTimeout(() => {
            if (this.overlay && this.overlay.parentNode) {
                this.overlay.parentNode.removeChild(this.overlay);
            }
            this.overlay = null;
            this.modal = null;
        }, 300);
        
        console.log('✅ Modal de pagamento fechado');
    }

    formatCurrency(amount) {
        // Se amount já está em reais (formato decimal)
        if (amount < 100) {
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(amount);
        }
        // Se amount está em centavos
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(amount / 100);
    }

    showToast(message, type = 'info') {
        // Usar o novo sistema de toast mais elegante
        this.showMiniToast(message);
    }
}

// Instância global do modal de pagamento
window.PaymentModal = new PaymentModal();

// Função para abrir o modal de pagamento
window.showPaymentModal = function(transactionData) {
    if (window.PaymentModal) {
        window.PaymentModal.show(transactionData);
    } else {
        console.error('PaymentModal não está disponível');
    }
};

// Integração com SyncPay - aguardar carregamento completo
document.addEventListener('DOMContentLoaded', function() {
    // Aguardar um pouco para garantir que SyncPayIntegration foi carregado
    setTimeout(() => {
        if (window.SyncPayIntegration) {
            // Sobrescrever a função createCashIn para mostrar o modal
            const originalCreateCashIn = window.SyncPayIntegration.createCashIn;
            
            if (originalCreateCashIn) {
                window.SyncPayIntegration.createCashIn = async function(cashInData) {
                    try {
                        const result = await originalCreateCashIn.call(this, cashInData);
                        
                        // Mostrar modal de pagamento após sucesso
                        if (result && (result.pix_qr_code || result.pix_copy_paste || result.pix_code)) {
                            setTimeout(() => {
                                window.showPaymentModal({
                                    ...result,
                                    amount: cashInData.amount
                                });
                            }, 500);
                        }
                        
                        return result;
                    } catch (error) {
                        console.error('❌ Erro no cash-in:', error);
                        throw error;
                    }
                };
            }
        }
        
        // Verificar se o objeto syncPay existe e atualizar o método showPixModal
        if (window.syncPay && window.syncPay.showPixModal) {
            const originalShowPixModal = window.syncPay.showPixModal;
            
            window.syncPay.showPixModal = function(data) {
                try {
                    if (window.showPaymentModal && typeof window.showPaymentModal === 'function') {
                        // Usar o modal atualizado
                        window.showPaymentModal({
                            pix_qr_code: data.pix_code,
                            pix_copy_paste: data.pix_code,
                            amount: data.amount || 0,
                            identifier: data.id,
                            status: 'pending'
                        });
                    } else {
                        // Fallback para o método original
                        originalShowPixModal.call(this, data);
                    }
                } catch (error) {
                    console.error('❌ Erro ao mostrar modal PIX:', error);
                    // Fallback final
                    alert('PIX gerado! Código: ' + (data.pix_code ? data.pix_code.substring(0, 50) + '...' : 'Não disponível'));
                }
            };
        }
        
        console.log('✅ Integração com SyncPay atualizada para usar modal moderno');
    }, 1000);
});