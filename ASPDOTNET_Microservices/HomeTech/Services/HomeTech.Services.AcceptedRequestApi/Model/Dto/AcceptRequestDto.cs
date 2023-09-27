namespace HomeTech.Services.AcceptedRequestApi.Model.Dto
{
	public class AcceptRequestDto
	{
		public int AcceptRequestId { get; set; }
		public string Service { get; set; }
		public string Category { get; set; }
		public int CustomerId { get; set; }
		public int TechnicianId { get; set; }
	}
}
