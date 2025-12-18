import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Loading from '../../../components/shared/loading';

const OrderRequests = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // 🔹 1️⃣ Get logged-in user data
    const { data: userInfo = {} } = useQuery({
        queryKey: ['user-info', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/email/${user.email}`);
            return res.data;
        }
    });

    const chefId = userInfo?.chefId;

    // 🔹 2️⃣ Get orders for this chef
    const { data: orders = [], isLoading } = useQuery({
        queryKey: ['chef-orders', chefId],
        enabled: !!chefId,
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/chef/${chefId}`);
            return res.data;
        }
    });

    // 🔹 3️⃣ Status Update Mutation
    const statusMutation = useMutation({
        mutationFn: ({ id, status }) =>
            axiosSecure.patch(`/orders/status/${id}`, { status }),
        onSuccess: () => {
            queryClient.invalidateQueries(['chef-orders']);
        }
    });

    const handleStatus = (id, status, msg) => {
        Swal.fire({
            title: "Are you sure?",
            text: msg,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes"
        }).then(result => {
            if (result.isConfirmed) {
                statusMutation.mutate({ id, status });
            }
        });
    };

    if (isLoading) {
        return <p className="text-center mt-10"><Loading></Loading></p>;
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Order Requests</h2>

            <div className="space-y-4">
                {orders.map(order => {
                    const { _id, orderStatus } = order;

                    const isCancelled = orderStatus === 'cancelled';
                    const isAccepted = orderStatus === 'accepted';
                    const isDelivered = orderStatus === 'delivered';

                    return (
                        <div key={_id} className="border rounded-lg p-4 shadow">
                            <div className="grid md:grid-cols-3 gap-3">
                                <p><strong>Food:</strong> {order.mealName}</p>
                                <p><strong>Price:</strong> ${order.price}</p>
                                <p><strong>Quantity:</strong> {order.quantity}</p>

                                <p><strong>User Email:</strong> {order.userEmail}</p>
                                <p><strong>Address:</strong> {order.userAddress}</p>
                                <p><strong>Order Time:</strong> {new Date(order.orderTime).toLocaleString()}</p>

                                <p><strong>Status:</strong> {orderStatus}</p>
                                <p><strong>Payment:</strong> {order.paymentStatus}</p>
                            </div>

                            {/* 🔘 Action Buttons */}
                            <div className="mt-4 flex gap-3">
                                <button
                                    disabled={isCancelled || isAccepted || isDelivered}
                                    onClick={() =>
                                        handleStatus(_id, 'cancelled', 'Cancel this order?')
                                    }
                                    className="btn btn-xs btn-error "
                                >
                                    Cancel
                                </button>

                                <button
                                    disabled={isCancelled || isAccepted || isDelivered}
                                    onClick={() =>
                                        handleStatus(_id, 'accepted', 'Accept this order?')
                                    }
                                    className="btn btn-xs btn-success"
                                >
                                    Accept
                                </button>

                                <button
                                    disabled={!isAccepted}
                                    onClick={() =>
                                        handleStatus(_id, 'delivered', 'Mark as delivered?')
                                    }
                                    className="btn btn-xs btn-primary"
                                >
                                    Deliver
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OrderRequests;
