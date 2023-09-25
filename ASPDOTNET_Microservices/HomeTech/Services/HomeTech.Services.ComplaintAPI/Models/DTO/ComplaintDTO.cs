namespace HomeTech.Services.ComplaintAPI.Models.DTO
{
	public class ComplaintDTO
	{
		public int ComplaintID { get; set; }
		public string Category { get; set; }
		public string Service { get; set; }
        public DateTime Date { get; set; }
		public string CustomerId { get; set; }
    }
}
