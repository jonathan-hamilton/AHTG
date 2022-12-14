namespace Domain
{
    public class Hospital
    {

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public DateTime EnteredOn { get; set; }
        public string Image { get; set; }
        public string Specialty { get; set; }
        public string Description { get; set; }
    }
}