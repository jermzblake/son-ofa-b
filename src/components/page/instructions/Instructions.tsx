import React, { FunctionComponent } from 'react'
import { Typography, Box } from '@material-ui/core'
import styled from 'styled-components'
import { useTheme } from 'styled-components'

export const Instructions: FunctionComponent = () => {
  const theme = useTheme()

  return (
    <Box>
      <Typography>
        Son-ofa-B is a trick taking standard deck playing card game. The object is for each player to bid the number of
        tricks they thinks they can take from each hand, then to take exactly that many; no more and no fewer. Points
        are awarded only for making the bid exactly, and are deducted for missing the bid, either over or under.
      </Typography>
      <Typography>
        The hook is that at least one player will fail on each hand, because the total number of tricks bid by the
        players may not equal the number of tricks available on that hand.
      </Typography>
      <br />
      <Typography>
        The rounds are numbered based on how many cards are dealt to each player, starting from 10 cards each down to 1
        and then back up to 10 for a total of 20 rounds. The appropriate number of cards are dealt and the next
        remaining one is revealed for everyone to see. That card is the “trump suit”.{' '}
        <em>
          <strong>When the card flipped for trump is an ace there is no trump.</strong>
        </em>{' '}
        Then people make their bids on how many tricks they can get, beginning with the player after the dealer (D on
        the player info bar). When it’s the dealer’s turn to finally bid, they may not bid a number that would make the
        total number of bids equal to the number of cards in each hand, thus assuring that at least one player will miss
        their bid in every round. After the bids the game plays out like many other trick taking games. The player to
        the left of the dealer plays the first card (any card they wish). Whatever card is played, everyone else must
        play the same suit. After all of the players play a card the highest one takes it. But if a player doesn’t have
        that suit they have two potential choices.
      </Typography>
      <Typography>
        <strong>1:</strong> play a trump card, which will beat any card of the led suit <strong>Note:</strong>
        <em>everyone else will still have to play the original suit if they have one</em> <strong>2:</strong> play any
        non-trump card, and regardless of number, it is considered a valueless card (this is a good time to get rid of
        dangerous high numbered cards when you don’t want any more tricks).
      </Typography>
      <br />
      <Typography>
        An example: the trump suit is hearts; the first player plays a 9 of clubs. Then comes a queen of clubs. The next
        player has no clubs, but bid 0, so he throws a king of diamonds. The next player also has no clubs, but bid 2,
        so he plays a jack of hearts. The last player, seeing that the clubs have been trumped, saves his ace of clubs,
        which would lose to the jack of hearts, and plays a 3 of clubs instead. The jack of hearts wins the trick.
      </Typography>
      <Typography>
        After all of the cards have been played, the scores are determined. Tricks are counted and that number is
        compared to the bids from the beginning of the round. You have to have the exact number of tricks that you bid.
        More or less than that number will result in negative points (-5 per trick off). If bid correctly, the number of
        tricks you’ve taken is squared plus 10.
      </Typography>
      <br />
      <Typography>
        Courtesy of <strong>Victor Nosko</strong>.<em> Thank you, you son of a b....</em>
      </Typography>
    </Box>
  )
}
