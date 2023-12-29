import { BAD_REQUEST, OK } from "http-status";
import { getWardsByDistrictAndProvinceCode } from "@/libs/address";

export default async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const provinceID = searchParams.get("provinceID");
	const districtCode = searchParams.get("districtCode");
	if (!provinceID)
		return Response.json(
			{ message: "provice required" },
			{ status: BAD_REQUEST }
		);
	if (!districtCode)
		return Response.json(
			{ message: "district required" },
			{ status: BAD_REQUEST }
		);
	const wards = getWardsByDistrictAndProvinceCode(districtCode, provinceID);
	return Response.json({ data: wards }, { status: OK });
}
