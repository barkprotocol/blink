"use client"

import { useState, useEffect } from 'react'
import { Connection, PublicKey } from '@solana/web3.js'
import { getGovernanceProgramVersion, getRealm, getAllProposals, Realm as RealmType, ProgramAccount, Proposal as ProposalType } from '@solana/spl-governance'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { colors } from '@/lib/colors'

interface Realm {
  name: string
  communityMintSupply: number
  votingProposalCount: number
}

interface Proposal {
  name: string
  state: string
  yesVotes: number
  noVotes: number
}

export function SolanaGovernanceData() {
  const [realm, setRealm] = useState<Realm | null>(null)
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGovernanceData = async () => {
      try {
        const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com')
        const realmPublicKey = new PublicKey('BARKkeAwhTuFzcLHX4DjotRsmjXQ1MshGrZbn1CUQqMo')

        const programId = await PublicKey.findProgramAddress(
          [Buffer.from('governance')],
          new PublicKey('GovernanceProgram1111111111111111111111111')
        )
        if (!programId[0]) {
          throw new Error('Failed to find program address')
        }
        const programVersion = await getGovernanceProgramVersion(connection, programId[0])
        const realmInfo = await getRealm(connection, realmPublicKey)

        setRealm({
          name: realmInfo.account.name,
          communityMintSupply: realmInfo.account.communityMint.toNumber(),
          votingProposalCount: realmInfo.account.votingProposalCount
        })

        const fetchedProposals = await getAllProposals(connection, realmPublicKey)
        const formattedProposals = fetchedProposals.map((p: ProgramAccount<ProposalType>) => ({
          name: p.account.name,
          state: p.account.state.toString(),
          yesVotes: p.account.getYesVoteCount().toNumber(),
          noVotes: p.account.getNoVoteCount().toNumber(),
        }))

        setProposals(formattedProposals)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching governance data:', err)
        setError('Failed to fetch governance data. Please try again later.')
        setLoading(false)
      }
    }

    fetchGovernanceData()
  }, [])

  if (loading) {
    return (
      <Card className="w-full border-2 shadow-lg" style={{borderColor: colors.accent, backgroundColor: colors.primary}}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold" style={{color: colors.secondary}}>Solana Governance Data</CardTitle>
          <CardDescription style={{color: colors.darkGray}}>Loading...</CardDescription>
        </CardHeader>
        <CardContent>
          <p style={{color: colors.darkGray}}>Fetching governance data...</p>
          <Skeleton className="w-full h-[200px] mt-4" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full border-2 shadow-lg" style={{borderColor: colors.accent, backgroundColor: colors.primary}}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold" style={{color: colors.secondary}}>Solana Governance Data</CardTitle>
          <CardDescription style={{color: colors.darkGray}}>Error</CardDescription>
        </CardHeader>
        <CardContent>
          <p style={{color: colors.secondary}}>{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full border-2 shadow-lg" style={{borderColor: colors.accent, backgroundColor: colors.primary}}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold" style={{color: colors.secondary}}>Solana Governance Data</CardTitle>
        <CardDescription style={{color: colors.darkGray}}>Real-time data from Solana Realms</CardDescription>
      </CardHeader>
      <CardContent>
        {realm && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2" style={{color: colors.secondary}}>Realm Information</h3>
            <p style={{color: colors.darkGray}}>Name: {realm.name}</p>
            <p style={{color: colors.darkGray}}>Community Mint Supply: {realm.communityMintSupply}</p>
            <p style={{color: colors.darkGray}}>Active Proposals: {realm.votingProposalCount}</p>
          </div>
        )}
        <h3 className="text-xl font-semibold mb-2" style={{color: colors.secondary}}>Active Proposals</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead style={{color: colors.secondary}}>Name</TableHead>
              <TableHead style={{color: colors.secondary}}>State</TableHead>
              <TableHead style={{color: colors.secondary}}>Yes Votes</TableHead>
              <TableHead style={{color: colors.secondary}}>No Votes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proposals.map((proposal, index) => (
              <TableRow key={index}>
                <TableCell style={{color: colors.darkGray}}>{proposal.name}</TableCell>
                <TableCell style={{color: colors.darkGray}}>{proposal.state}</TableCell>
                <TableCell style={{color: colors.darkGray}}>{proposal.yesVotes}</TableCell>
                <TableCell style={{color: colors.darkGray}}>{proposal.noVotes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {proposals.length === 0 && (
          <p style={{color: colors.darkGray}}>No active proposals at the moment.</p>
        )}
      </CardContent>
    </Card>
  )
}

