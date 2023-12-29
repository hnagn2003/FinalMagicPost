import { BAD_REQUEST, OK } from "http-status";
import { getDistrictsByProvinceCode } from "@/libs/address";

export default async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const provinceID = searchParams.get("provinceID");
	if (!provinceID)
		return Response.json(
			{ message: "provice required" },
			{ status: BAD_REQUEST }
		);
	const districts = getDistrictsByProvinceCode(provinceID);
	return Response.json({ data: districts }, { status: OK });
}
