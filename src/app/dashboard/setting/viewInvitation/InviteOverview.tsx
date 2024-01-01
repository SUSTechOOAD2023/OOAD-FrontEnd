'use server'
import {getCookie} from "@/cookie";

const debug = process.env.debug
const path = process.env.path

export interface InviteOverview{
    inviteCode: string,
    identity: string
}
export default async function getInviteOverview(id: string, need: number, identity: string): Promise<InviteOverview[] | null>{
    //TODO: add fetch logic
    if (debug === 'true') {
        return [
            {
              inviteCode: "AAA",
              identity: identity
            },
            {
                inviteCode: "AAA1",
                identity: identity
              },
              {
                inviteCode: "AAA2",
                identity: identity
              },
              {
                inviteCode: "AAA3",
                identity: identity
              },
            {
                inviteCode: "BBB",
                identity: identity
              },
              {
                inviteCode: "CCC",
                identity: identity
              },
          ].slice(0, need);
    }
    else {
        const request = new Request(`${path}/inviteCode/get?identity=${identity}&k=${need}`, {method: 'POST'} )
        const res = await fetch(request)
        if (!res.ok) return null;
        const data = await res.json()
        return data.map(item => ({
            inviteCode: item.code,
            identity: item.identity
        }))
    }
} 