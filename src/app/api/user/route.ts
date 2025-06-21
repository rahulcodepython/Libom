import { routeHandlerWrapper } from "@/action";
import { User } from "@/models/user.models";

export const GET = routeHandlerWrapper(async (request: Request) => {
    const page = parseInt(new URLSearchParams(new URL(request.url).search).get("page") || "1", 10);
    const limit = parseInt(new URLSearchParams(new URL(request.url).search).get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const users = await User.find({}, { __v: 0 })
        .sort({ createdAt: -1 })

    const filteredUser = users.slice(skip, skip + limit);

    return new Response(JSON.stringify({
        count: users.length,
        next: filteredUser.length > limit ? `/api/user?page=${page + 1}&limit=${limit}` : null,
        results: filteredUser
    }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
})

export const POST = routeHandlerWrapper(async (request: Request) => {
    const formData = await request.json();

    if (!formData.code || !formData.name || !formData.email || !formData.mobile) {
        return new Response(JSON.stringify({ message: "All fields are required" }), {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    const user = new User({
        code: formData.code,
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        active: formData.active ?? true,
    });

    await user.save();

    return new Response(JSON.stringify({
        message: "User created successfully",
        data: {
            _id: user._id,
            code: user.code,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            active: user.active,
            createdAt: user.createdAt.toISOString(),
        }
    }), {
        status: 201,
        headers: {
            "Content-Type": "application/json",
        },
    });
});

export const PATCH = routeHandlerWrapper(async (request: Request) => {
    const formData = await request.json();

    const userId = formData._id;

    if (!userId || !formData.code || !formData.name || !formData.email || !formData.mobile) {
        return new Response(JSON.stringify({ message: "All fields are required" }), {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    const user = await User.findByIdAndUpdate(userId, {
        code: formData.code,
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        active: formData.active ?? true,
    }, { new: true });

    if (!user) {
        return new Response(JSON.stringify({ message: "User not found" }), {
            status: 404,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    return new Response(JSON.stringify({
        message: "User updated successfully",
        data: {
            _id: user._id,
            code: user.code,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            active: user.active,
            createdAt: user.createdAt.toISOString(),
        }
    }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
});

