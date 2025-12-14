import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();

    // 🔥 Fetch All Users
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        }
    });

    // 🚫 Make Fraud
    const handleMakeFraud = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This user will be marked as fraud!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Make Fraud"
        });

        if (confirm.isConfirmed) {
            await axiosSecure.patch(`/users/fraud/${id}`);
            refetch();

            Swal.fire("Success!", "User marked as fraud", "success");
        }
    };

    // ♻️ Remove Fraud
    const handleRemoveFraud = async (id) => {
        await axiosSecure.patch(`/users/remove-fraud/${id}`);
        refetch();

        Swal.fire("Success!", "Fraud removed successfully", "success");
    };

    if (isLoading) return <p>Loading users...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((u, index) => (
                            <tr key={u._id}>
                                <td>{index + 1}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td className="capitalize">{u.role}</td>
                                <td>
                                    {u.status === "fraud" ? (
                                        <span className="text-red-500 font-semibold">
                                            Fraud
                                        </span>
                                    ) : (
                                        <span className="text-green-500">
                                            Active
                                        </span>
                                    )}
                                </td>

                                <td className="space-x-2">
                                    {/* MAKE FRAUD */}
                                    {u.role !== "admin" && u.status !== "fraud" && (
                                        <button
                                            onClick={() => handleMakeFraud(u._id)}
                                            className="btn btn-xs btn-error"
                                        >
                                            Make Fraud
                                        </button>
                                    )}

                                    {/* REMOVE FRAUD */}
                                    {u.status === "fraud" && (
                                        <button
                                            onClick={() => handleRemoveFraud(u._id)}
                                            className="btn btn-xs btn-success"
                                        >
                                            Remove Fraud
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
