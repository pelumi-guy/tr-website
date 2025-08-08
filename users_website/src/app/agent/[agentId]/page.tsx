// app/agents/[agentId]/page.tsx
import AgentProfileHeader from '@/components/user/agent/AgentProfileHeader';
import {
    notFound
} from 'next/navigation';
import { images } from '@/exports/images'
import AgentListings from '@/components/user/agent/AgentListings';


// Mock data fetching function - replace with your actual API call
async function getAgentData(agentId: string) {
    if (agentId === 'john-doe') {
        return {
            firstName: 'John', lastName: 'Doe', title: 'Lead Agent', phone: '+234 800 123 4567', email: 'johndoe@transcendentralty.com', rating: 4.0, bio: ["With years of experience and a deep understanding of the local real estate market, John Doe is dedicated to helping clients find their dream properties or secure the best deals on their investments. Specializing in luxury residential, commercial, and investment properties, John Doe combines market expertise with a personalized approach to deliver exceptional results every time.", "Whether you're a first-time buyer, an investor, or looking to sell your property, John Doe is here to guide you every step of the way."], imageUrl: images.TeamMemberOnePlaceholder,
            quote: "Your satisfaction is my priority. Let's turn your real estate goals into reality!",
        }
            ;
    }
    return null; // Agent not found
}

export default async function AgentProfilePage({
    params
}

    : {
        params: {
            agentId: string
        }
    }

) {
    const agentData = await getAgentData(params.agentId);
    if (!agentData) {
        notFound(); // Show 404 page if agent doesn't exist
    }
    return (<> <AgentProfileHeader agent={
        agentData
    }
    /> {
            <AgentListings />
        }
        {
            /* e.g., <AgentListings agentId={params.agentId} /> */
        }
    </>);
}