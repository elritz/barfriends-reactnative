import { gql } from '@apollo/client'

export const UPVOTE_H6_VENUE_RECOMMENDATION_MUTATION = gql`
	mutation upvoteH6VenueRemmendation($venueRecommendationId: String!) {
		upvoteH6VenueRemmendation(venueRecommendationId: $venueRecommendationId)
	}
`

export const UPVOTE_H6_COMING_AREA_MUTATION = gql`
	mutation upvoteH6ComingArea($comingAreaId: String!) {
		upvoteH6ComingArea(comingAreaId: $comingAreaId)
	}
`
