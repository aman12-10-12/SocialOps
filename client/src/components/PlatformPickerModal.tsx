import { CheckCircleIcon, ExternalLinkIcon, XIcon } from "lucide-react";
import { PLATFORMS } from "../assets/assets";

// Neumorphism shadow tokens (SocialOps palette)
const NEU_RAISED_SM = "shadow-[4px_4px_10px_rgba(1,31,75,0.14),-4px_-4px_10px_rgba(255,255,255,0.85)]"
const NEU_INSET = "shadow-[inset_5px_5px_10px_rgba(1,31,75,0.14),inset_-5px_-5px_10px_rgba(255,255,255,0.85)]"

interface PlatformPickerModalProps{
    connectedIds: string[];
    connecting: string | null;
    onClose: () => void;
    onConnect: (platformId: string) => void;
}

const PlatformPickerModal = ({connectedIds, connecting, onClose, onConnect} : PlatformPickerModalProps) => {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#011f4b]/50 backdrop-blur">
        <div className="bg-[#e4edf2] rounded-2xl w-full max-w-md shadow-[0_20px_60px_rgba(1,31,75,0.35)]">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#bbdcf0]/60 bg-[#dce8f0]/40 rounded-t-2xl">
                <h3 className="text-[#011f4b]">Choose a Platform</h3>
                <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-[#d8e6ef] text-[#6497b1] hover:text-[#011f4b] transition-colors">
                    <XIcon className="size-4"/>
                </button>
            </div>

            {/* Platform List */}
            <div className="p-6 flex flex-col gap-2">
                {PLATFORMS.map((p)=> {
                    const isConnected = connectedIds.includes(p.id);
                    const isConnecting = connecting === p.id;

                    return (
                        <button key={p.id}
                        disabled = {isConnected || isConnecting}
                        onClick={() => onConnect(p.id)}
                        className={`flex items-center gap-3 p-3.5 rounded-xl text-left transition-all bg-[#e4edf2] ${isConnected ? `${NEU_INSET} cursor-default` : `${NEU_RAISED_SM} hover:shadow-[6px_6px_14px_rgba(69,0,226,0.2),-6px_-6px_14px_rgba(255,255,255,0.9)] cursor-pointer`}
                        ${isConnecting && "opacity-60"}`}>
                            {/* Icon */}
                            <div className="p-2">
                                <p.icon className={`size-5 ${isConnected ? "text-[#005b96]" : "text-[#6497b1]"}`}/>
                            </div>

                            {/* Label */}
                            <div className="flex-1 min-w-0">
                                <div className={`text-sm ${isConnected ? "text-[#005b96] font-medium" : "text-[#011f4b]"}`}>
                                    {p.name}
                                </div>
                                <div className="text-xs text-[#6497b1] truncate">
                                    {isConnected ? "Already Connected" : p.description}
                                </div>
                            </div>

                            {/* Status */}
                            {isConnected && <CheckCircleIcon className="size-4 text-[#005b96] shrink-0"/>}
                            {isConnecting && <div className="size-4 border-2 border-[#5813e1] border-t-transparent rounded-full animate-spin shrink-0"/>}
                            {!isConnected && !isConnecting && <ExternalLinkIcon className="size-3.5 text-[#6497b1] shrink-0"/>}
                        </button>
                    )
                })}

            </div>

        </div>
    </div>
  )
}

export default PlatformPickerModal