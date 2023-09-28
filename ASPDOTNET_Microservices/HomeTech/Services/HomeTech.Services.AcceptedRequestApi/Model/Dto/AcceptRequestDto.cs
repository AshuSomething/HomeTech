namespace HomeTech.Services.AcceptedRequestApi.Model.Dto
{
	public class AcceptRequestDto
	{
		public int Id { get; set; }
		public int ComplaintID { get; set; }
		public string Service { get; set; }
		public string Category { get; set; }
		public DateTime Date { get; set; }
		public string CustomerId { get; set; }
		public string TechnicianId { get; set; }
	}
}
