"use client"

import { useState, useEffect } from 'react'
import { Connection, PublicKey } from '@solana/web3.js'
import { getGovernanceProgramVersion, getRealm, getAllProposals, Realm as RealmType, ProgramAccount, Proposal as ProposalType } from '@solana/spl-governance'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import { colors } from '@/lib/colors'
import Link from 'next/link'

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
          new PublicKey('GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw')
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

        const fetchedProposals: ProgramAccount<ProposalType>[] = await getAllProposals(connection, programId[0], realmPublicKey)
        if (fetchedProposals.length === 0) {
          console.log('No proposals found');
          setProposals([]);
        } else {
          const formattedProposals = fetchedProposals.map((p: ProgramAccount<ProposalType>) => ({
            name: p.account.name,
            state: p.account.state.toString(),
            yesVotes: p.account.getYesVoteCount().toNumber(),
            noVotes: p.account.getNoVoteCount().toNumber(),
          }));
          setProposals(formattedProposals);
        }

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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to App
          </Button>
        </Link>
      </div>
      <div className="space-y-2 mb-8">
        <h1 className="text-4xl font-bold" style={{color: colors.secondary}}>Solana Governance Data</h1>
        <p className="text-xl" style={{color: colors.darkGray}}>Real-time insights into BARK token governance</p>
      </div>
      <Card className="w-full border-2 shadow-lg mb-8" style={{borderColor: colors.accent, backgroundColor: colors.primary}}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold" style={{color: colors.secondary}}>About Solana Governance</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-semibold mb-2" style={{color: colors.secondary}}>How It Works</h3>
          <p style={{color: colors.darkGray}}>
            Solana Governance allows BARK token holders to participate in the decision-making process of the BARK ecosystem. 
            Here's a brief overview of how it works:
          </p>
          <ol className="list-decimal list-inside mt-2 space-y-2" style={{color: colors.darkGray}}>
            <li>Token holders can create and vote on proposals</li>
            <li>Each proposal has a voting period during which token holders can cast their votes</li>
            <li>Votes are weighted based on the number of tokens held</li>
            <li>If a proposal reaches the required threshold, it passes and can be implemented</li>
          </ol>
        </CardContent>
      </Card>
      <Card className="w-full border-2 shadow-lg" style={{borderColor: colors.accent, backgroundColor: colors.primary}}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold" style={{color: colors.secondary}}>Current Governance Data</CardTitle>
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
    </div>
  )
}

