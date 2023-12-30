'use server'
const debug = process.env.debug
const path = process.env.path

export interface InviteOverview{
    inviteCode: string,
    identity: string
}
export default async function getInviteOverview(id: string): Promise<InviteOverview[]>{
    //TODO: add fetch logic
    if (debug !== 'TODO') {
        return [
            {
              inviteCode: "AAA",
              identity: "teacher"
            },
            {
                inviteCode: "BBB",
                identity: "admin"
              },
              {
                inviteCode: "CCC",
                identity: "student"
              },
          ];
    }
    else return [
        {
          inviteCode: []
        }
      ];
} 