import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/shared/loading";

const ManageRequest = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // 🔥 Fetch all requests
    const { data: requests = [], isLoading } = useQuery({
        queryKey: ['requests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/requests');
            return res.data;
        }
    });

    // ✅ Accept mutation
    const acceptMutation = useMutation({
        mutationFn: async ({ id, payload }) => {
            return axiosSecure.patch(`/request/accept/${id}`, payload);
        },
        onSuccess: () => {
            Swal.fire("Approved!", "Request approved successfully", "success");
            queryClient.invalidateQueries(['requests']);
        }
    });

    // ❌ Reject mutation
    const rejectMutation = useMutation({
        mutationFn: async (id) => {
            return axiosSecure.patch(`/request/reject/${id}`);
        },
        onSuccess: () => {
            Swal.fire("Rejected!", "Request rejected", "info");
            queryClient.invalidateQueries(['requests']);
        }
    });

    if (isLoading) {
        return <p className=""><Loading></Loading></p>;
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Manage Requests</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Request Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {requests.map(req => (
                            <tr key={req._id}>
                                <td>{req.userName}</td>
                                <td>{req.userEmail}</td>
                                <td className="capitalize">{req.requestType}</td>
                                <td className="capitalize">{req.requestStatus}</td>
                                <td>
                                    {new Date(req.requestTime).toLocaleString()}
                                </td>
                                <td className="space-x-2  space-y-2 lg:space-y-0   ">
                                    <button
                                        disabled={req.requestStatus !== 'pending'}
                                        onClick={() =>
                                            acceptMutation.mutate({
                                                id: req._id,
                                                payload: {
                                                    userEmail: req.userEmail,
                                                    requestType: req.requestType
                                                }
                                            })
                                        }
                                        className="btn btn-xs btn-success border-0 bg-green-500 rounded-sm"
                                    >
                                        Accept
                                    </button>

                                    <button
                                        disabled={req.requestStatus !== 'pending'}
                                        onClick={() => rejectMutation.mutate(req._id)}
                                        className="btn btn-xs btn-error border-0 bg-red-500 rounded-sm"
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ManageRequest;
