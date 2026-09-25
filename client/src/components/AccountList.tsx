import { AlertCircleIcon, CheckCircleIcon, PlusIcon, UnplugIcon } from "lucide-react";
import { PLATFORMS } from "../assets/assets";

// Neumorphism shadow tokens (SocialOps palette)
const NEU_RAISED = "shadow-[8px_8px_18px_rgba(1,31,75,0.16),-8px_-8px_18px_rgba(255,255,255,0.85)]"
const NEU_INSET = "shadow-[inset_5px_5px_10px_rgba(1,31,75,0.14),inset_-5px_-5px_10px_rgba(255,255,255,0.85)]"

interface AccountListProps {
    accounts: any[];
    onDiconnect: (accountId: string)=> Promise<void>
}

const AccountList = ({accounts, onDiconnect}: AccountListProps) => {

    const handleDisconnect = async (accountId: string) => {
        const confirm = window.confirm("Are you sure you want to disconnect this account?")
        if(!confirm) return;
        await onDiconnect(accountId)
    }

    if(accounts.length === 0) {
        return (
            <div className="bg-[#e4edf2] rounded-2xl border-2 border-dashed border-[#a8daf9] flex flex-col items-center justify-center py-20 px-6">
                <div className={`size-14 bg-[#e4edf2] rounded-2xl flex items-center justify-center mb-4 ${NEU_INSET}`}>
                    <PlusIcon className="size-6 text-[#6497b1]"/>
                </div>
                <p className="text-[#011f4b] text-lg">No Accounts connected</p>
                <p className="text-sm text-[#6497b1] mt-1 max-w-xs text-center">Connect your first social media platform to start scheduling and automating your content.</p>
            </div>
        )
    }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
       {accounts.map((account, index)=> {
            const meta = PLATFORMS.find((p) => p.id === account.platform);
            if(!meta) return null;

            return (
                <div key={index} 
                className={`group bg-[#e4edf2] rounded-2xl p-5 flex items-center gap-4 transition-shadow ${NEU_RAISED} hover:shadow-[6px_6px_14px_rgba(69,0,226,0.15),-6px_-6px_14px_rgba(255,255,255,0.9)]`}>
                    <div className={`size-12 bg-[#e4edf2] rounded-xl flex items-center justify-center shrink-0 ${NEU_INSET}`}>
                        <meta.icon className="size-6 text-[#005b96]"/>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-[#011f4b] truncate">
                            {account.handle}
                        </div>
                        <div className="text-sm text-[#6497b1] mt-0.5">
                            {meta.name}
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                        {account.status === 'connected' ? (
                            <>
                            <CheckCircleIcon className="size-4 text-[#005b96]"/>
                            <span className="text-xs text-[#005b96]">Connected</span>
                            </>
                        ) : (
                            <>
                                <AlertCircleIcon className="size-4 text-[#3100a2]"/>
                                <span className="text-xs text-[#3100a2]">Disconnected</span>
                            </>
                        )}
                    </div>
                    <button 
                    onClick={()=> handleDisconnect(account._id)}
                    title="Disconnect account"
                    className="ml-2 p-1.5 rounded-lg text-[#a8daf9] group-hover:text-[#4500e2] transition-all">
                        <UnplugIcon className="size-4"/>
                    </button>
                </div>
            )
       })}
    </div>
  )
}

export default AccountList