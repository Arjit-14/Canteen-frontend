import { QRCodeSVG } from 'qrcode.react';

const QRToken = ({ token, size = 200 }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="p-4 bg-white rounded-2xl shadow-lg shadow-primary-500/20">
                <QRCodeSVG
                    value={token}
                    size={size}
                    level="M"
                    includeMargin={false}
                    bgColor="#ffffff"
                    fgColor="#1a1a2e"
                />
            </div>

            <div className="mt-4 text-center">
                <p className="text-sm text-dark-400 mb-1">Token ID</p>
                <p className="font-mono text-lg font-bold text-primary-400 bg-dark-800 px-4 py-2 rounded-lg">
                    {token}
                </p>
            </div>
        </div>
    );
};

export default QRToken;
