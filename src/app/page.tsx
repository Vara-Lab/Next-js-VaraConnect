'use client'

import React, { useState, useEffect } from "react";
import { FiZap } from "react-icons/fi";
import { walletConnectService, SignAndSendTransferService } from "varaconnect";
import { ApiPromise, WsProvider } from "@polkadot/api";

export default function Home() {
  const [connected, setConnected] = useState(false);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState<number>();
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSigning, setIsSigning] = useState(false);
  const [api, setApi] = useState<ApiPromise | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && walletConnectService.isConnected()) {
      setConnected(true);
      setAccounts(walletConnectService.getAccounts());
    }
  }, []);

  useEffect(() => {
    const initApi = async () => {
      const wsProvider = new WsProvider(process.env.NEXT_PUBLIC_NODE_ADDRESS!);
      const apiInstance = await ApiPromise.create({ provider: wsProvider });
      setApi(apiInstance);
    };
    initApi();
  }, []);

  const handleConnectWallet = async () => {
    try {
      await walletConnectService.enableWalletConnect();
      setAccounts(walletConnectService.getAccounts());
      setConnected(true);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setError("Failed to connect wallet. Check console for more details.");
    }
  };

  const handleSignAndSendTransfer = async () => {
    if (!api || accounts.length === 0) {
      setError("API not ready or no accounts available.");
      return;
    }

    setError(null);
    setIsSigning(true);

    try {
      const transferService = new SignAndSendTransferService(api, true);
      const txId = await transferService.signAndSendTransfer(
        accounts,
        walletConnectService.signTransaction.bind(walletConnectService),
        recipient,
        Number(amount) * 1_000_000_000_000
      );
      setTxHash(txId);
    } catch (error: any) {
      console.error("Error sending transfer:", error);
      setError(error.message || "Failed to send transfer.");
    } finally {
      setIsSigning(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 rounded-2xl shadow-2xl bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white font-sans border border-white/10">
      <h1 className="text-center text-2xl mb-6 bg-gradient-to-r from-cyan-400 to-lime-300 bg-clip-text text-transparent font-bold">
        Wallet Connect with Vara Network
      </h1>

      <div className="flex items-center justify-center gap-4 mb-6">
        <img
          src="https://walletconnect.network/icon.png?14b0dfc4ce526451"
          alt="WalletConnect"
          className="w-24 h-24 rounded-full shadow"
        />
        <div className="w-11 h-11 bg-black/60 rounded-full p-2 shadow-lg text-yellow-300 hover:text-yellow-400 transition-transform hover:scale-110">
          <FiZap className="w-full h-full" />
        </div>
        <img
          src="https://img.cryptorank.io/coins/vara_network1695313579900.png"
          alt="Vara Network"
          className="w-24 h-24 rounded-full shadow"
        />
      </div>

      {error && (
        <div className="bg-red-600/20 text-red-300 p-4 rounded-md mb-4 border border-red-400/20">
          <strong className="block mb-1">Error:</strong>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {!connected ? (
        <button
          onClick={handleConnectWallet}
          className="w-full py-3 text-white rounded-lg bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 shadow transition-all"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="bg-green-700/20 text-green-300 p-3 rounded-md border border-green-400/20 text-sm">
            ✅ Wallet connected successfully!
          </div>

          <div>
            <p className="font-semibold mb-2">Accounts:</p>
            <ul className="list-disc pl-5 text-sm text-gray-300">
              {accounts.map((acc, i) => (
                <li key={i}>{acc.address}</li>
              ))}
            </ul>
          </div>

          {txHash === null && (
            <>
              <input
                type="text"
                placeholder="Recipient Address"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="bg-white/10 border border-white/20 px-4 py-2 rounded-md placeholder:text-gray-400 text-sm"
              />
              <input
                type="number"
                placeholder="Amount"
                value={amount || ""}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="bg-white/10 border border-white/20 px-4 py-2 rounded-md placeholder:text-gray-400 text-sm"
              />
              <button
                onClick={handleSignAndSendTransfer}
                disabled={isSigning}
                className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
              >
                {isSigning ? "Sending Transfer..." : "Sign and Send Transfer"}
              </button>
            </>
          )}
        </div>
      )}

      {txHash && (
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-cyan-500/5 to-blue-900/10 border border-white/10 shadow hover:scale-[1.01] transition-transform">
          <h3 className="text-sm text-teal-200 font-semibold uppercase tracking-wide mb-3">
            Transaction Hash
          </h3>
          <code className="block p-3 rounded-md text-cyan-300 bg-black/50 text-sm break-all border border-white/10">
            {txHash}
          </code>
        </div>
      )}
    </div>
  );
}
