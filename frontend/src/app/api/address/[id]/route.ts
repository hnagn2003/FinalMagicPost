import { BAD_REQUEST } from "http-status";

export async function GET(_: Request, { params }: { params: { id: string } }) {
	const placeId = params.id;
	if (!placeId)
		return Response.json(
			{ message: "Không hợp lệ" },
			{ status: BAD_REQUEST }
		);
	const res = await fetch(
		"https://rsapi.goong.io/Place/Detail?" +
			new URLSearchParams({
				place_id: placeId,
				api_key: process.env.GOONG_API_KEY!,
			})
	);
	const response = await res.json();
	return Response.json(
		{ message: "200", data: response.result },
		{ status: 200 }
	);
}
