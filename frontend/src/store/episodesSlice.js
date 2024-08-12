import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const episodeAdapter = createEntityAdapter({});

const initialState = episodeAdapter.getInitialState();

export const episodeApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getEpisodes: builder.query({
			query: (data) => ({
				url: "/episode",
				method: "PUT",
				body: { ...data },
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			// keepUnusedDataFor: 5,
			transformResponse: (responseData) => {
				const loadedEpisodes = responseData.map((episode) => {
					episode.id = episode._id;
					return episode;
				});
				return episodeAdapter.setAll(initialState, loadedEpisodes);
			},
			providesTags: (result) => {
				if (result?.ids) {
					return [
						{ type: "episode", id: "LIST" },
						...result.ids.map((id) => ({ type: "episode", id })),
					];
				} else return [{ type: "episode", id: "LIST" }];
			},
		}),
		addNewEpisode: builder.mutation({
			query: (episodeData) => ({
				url: "/episode",
				method: "POST",
				body: { ...episodeData },
			}),
			invalidatesTags: (result, err, arg) => [{ type: "episode", id: arg.id }],
		}),
		deleteEpisode: builder.mutation({
			query: (data) => ({
				url: "/episode",
				method: "delete",
				body: { ...data },
			}),
			invalidatesTags: (result, err, arg) => [{ type: "episode", id: arg.id }],
		}),
		updateEpisode: builder.mutation({
			query: (data) => ({
				url: "/episode",
				method: "PATCH",
				body: {
					...data,
				},
			}),
			invalidatesTags: (result, error, arg) => [{ type: "episode", id: arg.id }],
		}),
	}),
});

export const { useGetEpisodesQuery, useAddNewEpisodeMutation, useUpdateEpisodeMutation, useDeleteEpisodeMutation } =
	episodeApiSlice;

const selectEpisodesResult = episodeApiSlice.endpoints.getEpisodes.select();

const selectEpisodesData = createSelector(
	selectEpisodesResult,
	(episodeResult) => episodeResult.data
);

export const {
	selectAll: selectAllEpisodes,
	selectById: selectEpisodeById,
	selectIds: selectEpisodeIds,
} = episodeAdapter.getSelectors(
	(state) => selectEpisodesData(state) ?? initialState
);
