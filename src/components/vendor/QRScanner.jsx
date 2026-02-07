import { useState } from 'react';
import { FiCamera, FiCheck, FiX } from 'react-icons/fi';
import Button from '../common/Button';

const QRScanner = ({ onScan, scanning = false }) => {
    const [manualToken, setManualToken] = useState('');
    const [showManual, setShowManual] = useState(true); // For simplicity, using manual input

    const handleManualSubmit = (e) => {
        e.preventDefault();
        if (manualToken.trim()) {
            onScan(manualToken.trim());
            setManualToken('');
        }
    };

    return (
        <div className="card p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <FiCamera className="w-5 h-5 mr-2 text-primary-400" />
                Scan QR / Enter Token
            </h3>

            {/* Manual token input */}
            <form onSubmit={handleManualSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm text-dark-400 mb-2">
                        Enter Order Token
                    </label>
                    <input
                        type="text"
                        value={manualToken}
                        onChange={(e) => setManualToken(e.target.value.toUpperCase())}
                        placeholder="ORD-XXXXXX-XXXX or CLM-XXXXXX-XXXX"
                        className="input font-mono"
                    />
                </div>

                <Button
                    type="submit"
                    variant="success"
                    className="w-full"
                    loading={scanning}
                    disabled={!manualToken.trim()}
                >
                    <FiCheck className="w-4 h-4 mr-2" />
                    Verify & Collect
                </Button>
            </form>

            {/* Instructions */}
            <div className="mt-4 p-3 bg-dark-700/50 rounded-lg text-sm text-dark-400">
                <p>Ask the student to show their QR code or provide the token ID from their app.</p>
            </div>
        </div>
    );
};

export default QRScanner;
