import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const projectAdapter = createEntityAdapter({});

const initialState = projectAdapter.getInitialState()

export const projectApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProjects: builder.query({
			query: (data) => ({
        url: "/project",
        method: "PATCH",
        body: {email: data},
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
      }),
      // keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedProjects = responseData.map(project => {
          project.id = project._id;
          return project;
        })
        return projectAdapter.setAll(initialState, loadedProjects);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [{ type: "project", id: "LIST" }, ...result.ids.map(id=>({type: "project", id}))]
        }
        else return [{type: "project", id: "LIST"}]
      }
    }),
    addNewProject: builder.mutation({
      query: (projectData) => ({
        url: "/project",
        method: "POST",
        body: {...projectData}
      }),
      invalidatesTags: (result, err, arg) => [
       { type: "project", id: arg.id}
      ]
    })
	}),
});

export const { useGetProjectsQuery, useAddNewProjectMutation } = projectApiSlice;
