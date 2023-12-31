using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace backend.Model.Entities;

public class Reward
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
    public long Id { get; set; }
    public string Name { get; set; }
    public int Cost { get; set; }
    [ForeignKey("family")]
    public long FamilyId { get; set; }
    public Family Family { get; set; }
}