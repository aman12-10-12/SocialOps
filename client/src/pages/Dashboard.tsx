import { ActivityIcon, CircleCheckIcon, ClockIcon, SendIcon, Share2Icon, TrendingUpIcon } from "lucide-react"
import { useEffect, useState } from "react"
import api from "../api/axios"

// Neumorphism shadow tokens (SocialOps palette)
const NEU_RAISED = "shadow-[8px_8px_18px_rgba(1,31,75,0.16),-8px_-8px_18px_rgba(255,255,255,0.85)]"
const NEU_RAISED_SM = "shadow-[4px_4px_10px_rgba(1,31,75,0.14),-4px_-4px_10px_rgba(255,255,255,0.85)]"
const NEU_INSET = "shadow-[inset_5px_5px_10px_rgba(1,31,75,0.14),inset_-5px_-5px_10px_rgba(255,255,255,0.85)]"

const Dashboard = () => {

    const [stats, setStats] = useState({scheduled: 0, published: 0, connectedAccounts: 0})
    const [activities, setActivities] = useState<any[]>([])

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [postsRes, accountsRes, activityRes] = await Promise.all([api.get("/api/posts"), api.get("/api/accounts"), api.get("/api/activity")])

                const posts = postsRes.data;
                setStats({
                    scheduled: posts.filter((p: any) => p.status === 'scheduled').length,
                    published: posts.filter((p: any) => p.status === 'published').length,
                    connectedAccounts: accountsRes.data.filter((a: any) => a.status === 'connected').length,
                })
                setActivities(activityRes.data)
            } catch(error: any) {
                console.error("Error fetching dashboard data", error)
            }
        };
        fetchDashboardData();
    },[])

    const statCards = [
        {
            label: "Scheduled Posts",
            value: stats.scheduled,
            icon: ClockIcon,
            trend: "+2 today",
        },
        {
            label: "Published Posts",
            value: stats.published,
            icon: CircleCheckIcon,
            trend: "All time",
        },
        {
            label: "Connected Accounts",
            value: stats.connectedAccounts,
            icon: Share2Icon,
            trend: "Active",
        }
    ]


    
  return (
    <div className="space-y-8 bg-[#e4edf2] rounded-3xl">
        {/* Welcome bar */}
        <div>
            <h2 className="text-2xl text-[#011f4b]">Good Morning! 🌤️</h2>
            <p className="text-[#03396c]/70 text-sm mt-0.5">Here's what's happening with your social media accounts today.</p>
        </div>

        {/* Stat card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {statCards.map((card)=> (
                <div key={card.label} 
                className={`bg-[#e4edf2] relative rounded-2xl p-5 ${NEU_RAISED} hover:shadow-[6px_6px_14px_rgba(69,0,226,0.2),-6px_-6px_14px_rgba(255,255,255,0.9)] transition-shadow duration-300`}>
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-3xl font-medium text-[#011f4b] tabular-nums">
                            {card.value}
                        </div>
                        <div className="text-xs absolute right-4 top-4 text-[#5813e1] flex items-center gap-1">
                            <TrendingUpIcon className="size-3" />
                            {card.trend}
                        </div>
                    </div>
                    <p className="text-sm text-[#03396c]/70 mt-1">{card.label}</p>
                </div>
            ))}
        </div>

        {/* Activity Feed */}
        <div className={`bg-[#e4edf2] rounded-2xl overflow-hidden ${NEU_RAISED}`}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#bbdcf0]/60">
                <h2 className="text-[#011f4b]">Recent Activity</h2>
                <span className="text-sm text-[#6497b1]">{activities.length} events</span>
            </div>

            {activities.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-6">
                    <div className={`size-12 bg-[#e4edf2] rounded-xl flex items-center justify-center mb-3 ${NEU_INSET}`}>
                        <ActivityIcon className="size-6 text-[#6497b1]"/>
                    </div>
                    <p className="text-[#03396c]">No Activity Yet</p>
                    <p className="text-[#6497b1] text-sm mt-1">Connect accounts and schedule posts to see events here.</p>
                </div>
            ) : (
                <div className="divide-y divide-[#cde2ee]/60">
                    {activities.map((activity)=>(
                        <div key={activity._id} 
                        className="flex items-start gap-4 px-6 py-4 hover:bg-[#d8e6ef]/40 transition-colors">
                            <div className={`size-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 bg-[#e4edf2] text-[#5813e1] ${NEU_RAISED_SM}`}>
                                <SendIcon className="size-4"/>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-1">
                                    <span className={`text-xs px-2 py-0.5 rounded-full bg-[#e4edf2] text-[#4500e2] font-medium ${NEU_INSET}`}>Published</span>
                                    <span className="text-xs text-[#6497b1] shrink-0">{new Date(activity.createdAt).toLocaleString()}</span>
                                </div>
                                <p className="text-sm text-[#03396c]">{activity.description}</p>
                            </div>
                        </div>
                    ))}

                </div>
            )}
        </div>

    </div>
  )
}

export default Dashboard