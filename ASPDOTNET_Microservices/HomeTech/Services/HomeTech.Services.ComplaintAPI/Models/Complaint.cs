using System.ComponentModel.DataAnnotations;

namespace HomeTech.Services.ComplaintAPI.Models
{
	public class Complaint
	{
        [Key]
        public int ComplaintID { get; set; }

        [Required]
        public string Category { get; set; }

        [Required]
        public string Service { get; set; }

        [Required]
        public DateTime Date { get; set; }
        [Required]
        public string CustomerId { get; set; }

    }
}
